class TaskDeletionError extends Error {
    constructor(message) {
        super(`The deletion process can't be made: ${message}`);
    }
}

class TaskGettingError extends Error {
    constructor(message) {
        super(`The task can't be gotten: ${message}`);
    }
}

class StoreUpdatingError extends Error {
    constructor(message) {
        super(`The updation process doesn't need be made: ${message}`);
    }
}

class DeleteTaskFromStoreError extends Error {
    constructor(message) {
        super(`The deletion process can't be made: ${message}`);
    }
}

class ClassInstanceError extends Error {
    constructor(message) {
        super(`This object doesn't relate to this class: ${message}`);
    }
}

class Task {
    get title() {
        return this._title;
    }

    get id() {
        return this._id;
    }

    get isDone() {
        return this._isDone;
    }

    constructor(id, title, isDone = false) {
        this._id = id;
        this._isDone = isDone;
        this._title = title;
    }

    toggle() {
        this._isDone = !this._isDone;
    }

    clone() {
        return new Task(this._id, this._title, this._isDone);
    }

    static deparse(task) {
        return JSON.stringify({
            id: task._id,
            title: task._title,
            isDone: task._isDone
        })
    }

    static parse(jsonLine) {
        const json = JSON.parse(jsonLine);
        return new Task(json.id, json.title, json.isDone);
    }

    static parseObject(obj) {
        return new Task(obj.id, obj.title, obj.isDone);
    }
}

class TaskManager {

    constructor(store) {

        if (!(store instanceof AbstractStore)) {
            throw new ClassInstanceError(
                `Store = ${store} isn't instance of ${AbstractStore}, but for further actions should`
            );
        }

        this._store = store;
    }

    create(title) {

        let randomId = function(pow) {
            return Math.floor(Math.random() * pow);
        }

        const id = randomId(100);

        return this._store.add(new Task(id, title));

    }

    delete(taskId) {
        if (!taskId) {
            throw new TaskDeletionError(
                `Task which needs to be deleted hasn't been found, only tasks which are in the list can be deleted`
            );
        }
        return this._store.delete(taskId);

    }

    async toggle(taskId) {

        const task = await this._store.get(taskId);
        task.toggle();

        return this._store.update(task);

    }

    getAll() {

        return this._store.getAll();
    }
}

class AbstractStore {
    get(taskId) {
        throw new Error('Not implemented');
    }

    add(task) {
        throw new Error('Not implemented');
    }

    delete(taskId) {
        throw new Error('Not implemented');
    }

    update(task) {
        throw new Error('Not implemented');

    }

    getAll() {
        throw new Error('Not implemented');
    }
}

class Store extends AbstractStore {
    constructor() {
        super();
        this._list = [];
    }

    get(taskId) {
        debugger
        const task = this._list.find(d => d.id === taskId);

        if (!task) {
            return Promise.reject(new TaskGettingError(
                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`
            ));
        }

        return Promise.resolve(task.clone());
    }

    add(task) {
        debugger
        this._list.push(task);
        return Promise.resolve(task.clone());
    }

    delete(taskId) {
        return new Promise(async(resolve, reject) => {
            this._list = this._list.filter(d => d.id !== taskId);

            try {
                await this.get(taskId);

            } catch (error) {
                return reject(new DeleteTaskFromStoreError(
                    error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`
                ));
            }

            return resolve(null);
        })
    }

    async update(task) {
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    getAll() {
        return Promise.resolve(this._list.map(task => task.clone()));
    }
}

class StoreLS extends AbstractStore {
    constructor() {
        super();
    }

    async get(taskId) {
        const taskProto = localStorage.getItem(StoreLS.lsKey + taskId);

        if (!taskProto) {
            return Promise.reject(new TaskGettingError(
                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`
            ));
        }

        return Promise.resolve(Task.parse(taskProto));
    }

    add(task) {
        localStorage.setItem(StoreLS.lsKey + task.id, Task.deparse(task));
        return Promise.resolve(task.clone());
    }

    async delete(taskId) {
        localStorage.removeItem(StoreLS.lsKey + taskId);

        try {
            (await this.getAll()).find(el => el.id !== taskId);
        } catch (error) {
            return Promise.reject(new DeleteTaskFromStoreError(
                error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`
            ));
        }

        return Promise.resolve(null);
    }

    async update(task) {
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    getAll() {
        return Promise.resolve(new Array(localStorage.length)
            .fill()
            .map((_, index) => index)
            .map(keyIndex => localStorage.key(keyIndex))
            .filter(el => el.indexOf(StoreLS.lsKey) === 0)
            .map(key => localStorage.getItem(key))
            .map(json => Task.parse(json)));
    }
}

StoreLS.lsKey = 'data';

class StoreDB extends AbstractStore {
    constructor() {
        super();
        this._url = "http://localhost:3000/tasks";
    }

    get(taskId) {
        return fetch(this._url + `/${taskId}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(obj => Task.parseObject(obj));
    }

    add(task) {
        return fetch(this._url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: Task.deparse(task)
            })
            .then(response => response.json())
            .then(json => Task.parse(json))
    }

    delete(taskId) {
        return fetch(this._url + `/${taskId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
    }

    async update(task) {
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    getAll() {
        return fetch(this._url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(jsonArray => jsonArray.map(obj => Task.parseObject(obj)))
    }

}

class ToDo {
    constructor(taskManager, render) {
        this._taskManager = taskManager;
        this._render = render;
    }

    init() {
        this._displayAll();
    }

    async addTask(title) {
        try {
            this._render.displayTask(await this._taskManager.create(title));
        } catch (error) {
            this._render.displayError(error);
        }
    }

    async deleteTask(taskId) {
        try {
            await this._taskManager.delete(taskId);
            this._render.unDisplayTask(taskId);

        } catch (error) {
            this._render.displayError(error);
        }
    }

    async toggleTask(taskId) {
        try {
            this._render.updateTask(await this._taskManager.toggle(taskId));
        } catch (error) {
            this._render.displayError(error);
        }
    }

    _displayAll() {
        this._taskManager.getAll()
            .then(tasks => tasks.forEach(task => this._render.displayTask(task)))
            .catch(error => this._render.displayError(error))
    }
}

class AbstractRender {
    displayTask(task) {
        throw new Error('not emplemented');
    }

    unDisplayTask(taskId) {
        throw new Error('not emplemented');
    }

    displayError(error) {
        throw new Error('not emplemented');
    }

    updateTask(task) {
        throw new Error('not emplemented');
    }
}

class Render extends AbstractRender {
    constructor() {
        super();
    }

    displayTask(task) {
        console.log(task);
    }

    unDisplayTask(taskId) {
        throw new Error('not emplemented');
    }

    displayError(error) {
        console.log(error);
    }

    updateTask(task) {
        throw new Error('not emplemented');
    }
}

class ConsoleTaskApplication {
    constructor() {
        this._toDo = new ToDo(new TaskManager(new Store()), new Render());
    }
    start() {
        this._toDo.init();
    }

    addTask(title) {
        this._toDo.addTask(title);
    }

    deleteTask(taskId) {
        this._toDo.deleteTask(taskId);
    }

    toggleTask(taskId) {
        this._toDo.toggleTask(taskId);
    }
}

class TaskApplication {
    constructor() {
        const buttonRef = document.querySelector('#add-button');
        const inputRef = document.querySelector('#input');
        const listRef = document.querySelector('#task-list');

        buttonRef.addEventListener('click', () => {
            this._toDo.addTask(inputRef.value);
            inputRef.value = ''
        })

        const render = new RenderApplication(listRef);
        this._toDo = new ToDo(new TaskManager(new Store()), render);
        render.deleteTaskFunction = this._toDo.deleteTask.bind(this._toDo);
        render.toggleTaskFunction = this._toDo.toggleTask.bind(this._toDo);
    }

    start() {
        this._toDo.init();
    }
}

class RenderApplication extends AbstractRender {
    constructor(listRef) {
        super();
        this._listRef = listRef;
    }

    set deleteTaskFunction(func) {
        this._deleteTaskFunction = func;
    }

    set toggleTaskFunction(func) {
        this._toggleTaskFunction = func;
    }

    displayTask(task) {
        const wrapper = document.createElement('li');
        wrapper.classList.add('todo-task');
        wrapper.setAttribute('id', task.id);
        if (task.isDone) {
            wrapper.classList.add('todo-task_done');
        }

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = task.isDone;

        const title = document.createElement('span');
        title.classList.add('todo-task__title');
        title.textContent = task.title;

        const button = document.createElement('button');
        button.classList.add('todo-task__delete');

        wrapper.appendChild(checkbox);
        wrapper.appendChild(title);
        wrapper.appendChild(button);
        this._listRef.appendChild(wrapper);

        button.addEventListener('click', (event) => {
            const id = Number(event.currentTarget.parentNode.id);
            this._deleteTaskFunction(id);
        })

        checkbox.addEventListener('change', (event) => {
            const id = Number(event.currentTarget.parentNode.id);
            this._toggleTaskFunction(id);
        })
    }

    unDisplayTask(taskId) {
        this._listRef.removeChild(document.getElementById(taskId));
    }

    displayError(error) {
        console.log(error);
    }

    updateTask(task) {
        const taskRef = document.getElementById(task.id);
        task.isDone ?
            taskRef.classList.add('todo-task_done') :
            taskRef.classList.remove('todo-task_done');
    }
}

const app = new TaskApplication();
app.start();