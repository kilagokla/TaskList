import { Task } from './task';

export abstract class AbstractRender {
    public abstract displayTask(task: Task);

    public abstract unDisplayTask(taskId: number);

    public abstract displayError(error: Error);

    public abstract updateTask(task: Task);
}

export class Render extends AbstractRender {
    constructor() {
        super();
    }

    public displayTask(task: Task) {
        console.log(task);
    }

    public unDisplayTask(taskId: number) {
        throw new Error('not emplemented');
    }

    public displayError(error: Error) {
        console.log(error);
    }

    public updateTask(task: Task) {
        throw new Error('not emplemented');
    }
}

type RenderFunc = (id: number) => void;
type DeleteMouseEvent = MouseEvent
    & {
        currentTarget: HTMLButtonElement
        & { parentNode: HTMLLIElement }
    };

type ToggleMouseEvent = MouseEvent
& {
    currentTarget: HTMLInputElement
    & { parentNode: HTMLLIElement }
};

export class RenderApplication extends AbstractRender {
    private _deleteTaskFunction: RenderFunc;
    private _toggleTaskFunction: RenderFunc;

    constructor(private _listRef: HTMLUListElement) {
        super();
    }

    public set deleteTaskFunction(func: RenderFunc) {
        this._deleteTaskFunction = func;
    }

    public set toggleTaskFunction(func: RenderFunc) {
        this._toggleTaskFunction = func;
    }

    public displayTask(task: Task) {
        const wrapper = document.createElement('li');
        wrapper.classList.add('todo-task');
        wrapper.setAttribute('id', String(task.id));
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

        button.addEventListener('click', (event: DeleteMouseEvent): void => {
            const id = Number(event.currentTarget.parentNode.id);
            this._deleteTaskFunction(id);
        })

        checkbox.addEventListener('change', (event: ToggleMouseEvent): void => {
            const id = Number(event.currentTarget.parentNode.id);
            this._toggleTaskFunction(id);
        })
    }

    public unDisplayTask(taskId: number): void {
        this._listRef.removeChild(document.getElementById(String(taskId)));
    }

    public displayError(error: Error): void {
        console.log(error);
    }

    public updateTask(task: Task): void {
        const taskRef = document.getElementById(String(task.id));
        task.isDone ?
            taskRef.classList.add('todo-task_done') :
            taskRef.classList.remove('todo-task_done');
    }
}