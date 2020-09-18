import { AbstractStore } from './store';
import { Task } from './task';


class ClassInstanceError extends Error {
    constructor(message) {
        super(`This object doesn't relate to this class: ${message}`);
    }
}

class TaskDeletionError extends Error {
    constructor(message) {
        super(`The deletion process can't be made: ${message}`);
    }
}

export class TaskManager {

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