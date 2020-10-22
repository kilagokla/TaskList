import { ToDo } from './todo';
import { Render, RenderApplication, AbstractRender } from './render';
import { TaskManager } from './task-manager';
import { Store, StoreLS, AbstractStore, StoreDB } from './store';

export abstract class AbstractApplication {
    protected _toDo: ToDo;

    constructor(protected _store: AbstractStore, protected _render: AbstractRender) {
        this._toDo = new ToDo(new TaskManager(_store), _render);
    }
    public abstract start(): void;
}

export class ConsoleTaskApplication extends AbstractApplication {
    constructor() {
        super(new Store(), new Render());
    }

    public start(): void {
        this._toDo.init();
    }

    public addTask(title: string): void {
        this._toDo.addTask(title);
    }

    public deleteTask(taskId: number): void {
        this._toDo.deleteTask(taskId);
    }

    public toggleTask(taskId: number): void {
        this._toDo.toggleTask(taskId);
    }
}

export class TaskApplication extends AbstractApplication {
    constructor() {
        const listRef = document.querySelector('#task-list') as HTMLUListElement;
        const render = new RenderApplication(listRef);
        super(new StoreDB(), render);
        const buttonRef = document.querySelector('#add-button');
        const inputRef = document.querySelector('#input') as HTMLInputElement;


        buttonRef.addEventListener('click', (): void => {
            this._toDo.addTask(inputRef.value);
            inputRef.value = ''
        })

        render.deleteTaskFunction = this._toDo.deleteTask.bind(this._toDo);
        render.toggleTaskFunction = this._toDo.toggleTask.bind(this._toDo);
    }

    public start(): void {
        this._toDo.init();
    }
}