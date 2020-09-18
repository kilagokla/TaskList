export class Task {
    get title() {
        return this._title;
    }

    get id() {
        return this._id;
    }

    get isDone() {
        return this._isDone;
    }

    constructor(id, title, isDone = false) {
        this._id = id;
        this._isDone = isDone;
        this._title = title;
    }

    toggle() {
        this._isDone = !this._isDone;
    }

    clone() {
        return new Task(this._id, this._title, this._isDone);
    }

    static deparse(task) {
        return JSON.stringify({
            id: task._id,
            title: task._title,
            isDone: task._isDone
        })
    }

    static parse(jsonLine) {
        const json = JSON.parse(jsonLine);
        return new Task(json.id, json.title, json.isDone);
    }

    static parseObject(obj) {
        return new Task(obj.id, obj.title, obj.isDone);
    }
}