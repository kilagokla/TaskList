import { Task } from './task';

class TaskGettingError extends Error {
    constructor(message) {
        super(`The task can't be gotten: ${message}`);
    }
}

class TaskDeletingFromStoreError extends Error {
    constructor(message) {
        super(`The deletion process can't be made: ${message}`);
    }
}

class StoreUpdatingError extends Error {
    constructor(message) {
        super(`The updation process doesn't need be made: ${message}`);
    }
}

export class AbstractStore {
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

export class Store extends AbstractStore {
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
                return reject(new TaskDeletingFromStoreError(
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

export class StoreLS extends AbstractStore {
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
            return Promise.reject(new TaskDeletingFromStoreError(
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

export class StoreDB extends AbstractStore {
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