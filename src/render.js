export class AbstractRender {
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

export class Render extends AbstractRender {
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

export class RenderApplication extends AbstractRender {
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