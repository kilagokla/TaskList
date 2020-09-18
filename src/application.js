import { ToDo } from './todo';
import { Render, RenderApplication } from './render';
import { TaskManager } from './task-manager';
import { Store, StoreLS } from './store';

export class AbstractApplication {
    constructor(store, render) {
        this._toDo = new ToDo(new TaskManager(store), render);
    }
    start() {
        throw new Error('not emplemented');
    }
}

export class ConsoleTaskApplication extends AbstractApplication {
    constructor() {
        super(new Store(), new Render());
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

export class TaskApplication extends AbstractApplication {
    constructor() {
        const listRef = document.querySelector('#task-list');
        const render = new RenderApplication(listRef);
        super(new StoreLS(), render);
        const buttonRef = document.querySelector('#add-button');
        const inputRef = document.querySelector('#input');


        buttonRef.addEventListener('click', () => {
            this._toDo.addTask(inputRef.value);
            inputRef.value = ''
        })

        render.deleteTaskFunction = this._toDo.deleteTask.bind(this._toDo);
        render.toggleTaskFunction = this._toDo.toggleTask.bind(this._toDo);
    }

    start() {
        this._toDo.init();
    }
}