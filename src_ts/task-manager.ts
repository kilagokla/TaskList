import { AbstractStore } from './store';
import { Task } from './task';

class TaskDeletionError extends Error {
    constructor(message: string) {
        super(`The deletion process can't be made: ${message}`);
    }
}

export class TaskManager {

    constructor(private _store: AbstractStore) { }

    public create(title: string): Promise<Task> {

        let randomId = function(pow: number) {
            return Math.floor(Math.random() * pow);
        }

        const id = randomId(100);

        return this._store.add(new Task(id, title));

    }

    public delete(taskId: number): Promise<null> {
        if (!taskId) {
            throw new TaskDeletionError(
                `Task which needs to be deleted hasn't been found, only tasks which are in the list can be deleted`
            );
        }
        return this._store.delete(taskId);

    }

    public async toggle(taskId: number): Promise<Task> {

        const task = await this._store.get(taskId);
        task.toggle();

        return this._store.update(task);

    }

    public getAll(): Promise<Task[]> {

        return this._store.getAll();
    }
}