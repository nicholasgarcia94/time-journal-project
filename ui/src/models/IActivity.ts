
export interface IActivity {
    id: number;
    name: string;
    duration: number;
    date: Date;

}

export class Activity implements IActivity {
    id: number;
    name: string;
    duration: number;
    date: Date;

    constructor(id: number, name: string, duration: number, date: Date) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.date = date;
    }
}