export class ToDo {
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