import { Task, ITaskResponse } from './task';

class TaskGettingError extends Error {
    constructor(message: string) {
        super(`The task can't be gotten: ${message}`);
    }
}

class TaskDeletingFromStoreError extends Error {
    constructor(message: string) {
        super(`The deletion process can't be made: ${message}`);
    }
}

class StoreUpdatingError extends Error {
    constructor(message: string) {
        super(`The updation process doesn't need be made: ${message}`);
    }
}

export abstract class AbstractStore {
    public abstract get(taskId: number): Promise<Task>;

    public abstract add(task: Task): Promise<Task>;

    public abstract delete(taskId: number): Promise<null>;

    public abstract update(task: Task): Promise<Task>;

    public abstract getAll(): Promise<Task[]>;
}

export class Store extends AbstractStore {
    private _list: Array<Task>;

    constructor() {
        super();
        this._list = [];
    }

    public get(taskId: number): Promise<Task> {
        const task = this._list.find(d => d.id === taskId);

        if (!task) {
            return Promise.reject(new TaskGettingError(
                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`
            ));
        }

        return Promise.resolve(task.clone());
    }

    public add(task: Task): Promise<Task> {
        this._list.push(task);
        return Promise.resolve(task.clone());
    }

    public delete(taskId: number): Promise<null> {
        return new Promise(async(resolve, reject) => {

            try {
                await this.get(taskId);

            } catch (error) {
                return reject(new TaskDeletingFromStoreError(
                    error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`
                ));
            }
            
            this._list = this._list.filter(d => d.id !== taskId);
            return resolve(null);
        })
    }

    public async update(task: Task): Promise<Task> {
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    public getAll(): Promise<Task[]> {
        return Promise.resolve(this._list.map(task => task.clone()));
    }
}

export class StoreLS extends AbstractStore {
    public static readonly LS_KEY = 'data';
    constructor() {
        super();
    }

    public async get(taskId: number): Promise<Task> {
        const taskProto = localStorage.getItem(StoreLS.LS_KEY + taskId);

        if (!taskProto) {
            return Promise.reject(new TaskGettingError(
                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`
            ));
        }

        return Promise.resolve(Task.parse(taskProto));
    }

    public add(task: Task): Promise<Task> {
        localStorage.setItem(StoreLS.LS_KEY + task.id, Task.deparse(task));
        return Promise.resolve(task.clone());
    }

    public async delete(taskId: number): Promise<null>{
        localStorage.removeItem(StoreLS.LS_KEY + taskId);

        try {
            (await this.getAll()).find(el => el.id !== taskId);
        } catch (error) {
            return Promise.reject(new TaskDeletingFromStoreError(
                error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`
            ));
        }

        return Promise.resolve(null);
    }

    public async update(task: Task): Promise<Task>{
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    public getAll(): Promise<Task[]> {
        return Promise.resolve(new Array(localStorage.length)
            .fill(null)
            .map((_, index) => index)
            .map(keyIndex => localStorage.key(keyIndex))
            .filter(el => el.indexOf(StoreLS.LS_KEY) === 0)
            .map(key => localStorage.getItem(key))
            .map(json => Task.parse(json)));
    }
}

export class StoreDB extends AbstractStore {
    private readonly _URL = "http://localhost:3000/tasks";
    private readonly _HEADERS = { 'Content-Type': 'application/json' };

    constructor() {
        super();
    }

    public get(taskId: number): Promise<Task> {
        return fetch(this._URL + `/${taskId}`, {
                method: "GET",
                headers: this._HEADERS
            })
            .then(response => response.json())
            .then((obj: ITaskResponse) => Task.parseObject(obj));
    }

    public add(task: Task): Promise<Task> {

        return fetch(this._URL, {
                method: "POST",
                headers: this._HEADERS,
                body: Task.deparse(task)
            })
            .then(response => response.json())
            .then(json => Task.parseObject(json))
    }

    public delete(taskId: number): Promise<null>{
        return fetch(this._URL + `/${taskId}`, {
                method: "DELETE",
                headers: this._HEADERS
            })
            .then(response => response.json())
    }

    public async update(task: Task): Promise<Task> {
        try {
            await this.delete(task.id);
        } catch (error) {
            return Promise.reject(error);
        }

        return this.add(task);
    }

    public getAll(): Promise<Task[]>{
        return fetch(this._URL, {
                method: "GET",
                headers: this._HEADERS
            })
            .then(response => response.json())
            .then(jsonArray => jsonArray.map((obj: ITaskResponse) => Task.parseObject(obj)))
    }
}