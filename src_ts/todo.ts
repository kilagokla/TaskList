import { TaskManager } from './task-manager';
import { AbstractRender } from './render';

export class ToDo {
    constructor(
        private _taskManager: TaskManager,
        private _render: AbstractRender){
        }

    public init(): void {
        this._displayAll();
    }

    public async addTask(title: string): Promise<void>{
        try {
            const task = await this._taskManager.create(title);
            this._render.displayTask(task);
        } catch (error) {
            this._render.displayError(error);
        }
    }

    public async deleteTask(taskId: number): Promise<void> {
        try {
            await this._taskManager.delete(taskId);
            this._render.unDisplayTask(taskId);

        } catch (error) {
            this._render.displayError(error);
        }
    }

    public async toggleTask(taskId: number): Promise<void> {
        try {
            this._render.updateTask(await this._taskManager.toggle(taskId));
        } catch (error) {
            this._render.displayError(error);
        }
    }

    private _displayAll(): void{
        this._taskManager.getAll()
            .then(tasks => tasks.forEach(task => this._render.displayTask(task)))
            .catch(error => this._render.displayError(error))
    }
}