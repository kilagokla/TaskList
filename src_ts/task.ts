export interface ITaskResponse {
    id: number;
    title: string;
    isDone: boolean;
}

export class Task {
    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get isDone(): boolean {
        return this._isDone;
    }

    constructor(
        private _id: number,
        private _title: string,
        private _isDone: boolean = false) {
    }

    public toggle(): void {
        this._isDone = !this._isDone;
    }

    public clone(): Task {
        return new Task(this._id, this._title, this._isDone);
    }

    public static deparse(task: Task): string {
        return JSON.stringify({
            id: task.id,
            title: task.title,
            isDone: task.isDone
        })
    }

    public static parse(jsonLine: string): Task {
        const json = JSON.parse(jsonLine);
        return new Task(json.id, json.title, json.isDone);
    }

    public static parseObject(obj: ITaskResponse): Task {
        return new Task(obj.id, obj.title, obj.isDone);
    }
}