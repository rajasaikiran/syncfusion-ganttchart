export interface meetingEvent {
    start?: {
        dateTime: string,
        timeZone: string
    },
    end?: {
        dateTime: string,
        timeZone: string
    },
    isAllDay: boolean,
    showAs: String,
}
export interface offEvent {
    userEmail: string,
    userName: string,
    oofEvents?: meetingEvent[]
}

export interface graphRecord {
    x: any[];
    y: String;
}

export interface syncChartData {
    TaskID: number,
    TaskName: string,
    StartDate: Date,
    EndDate: Date,
    isAllDay?: boolean,
    subTasks?: syncChartData[],
    resources?: { resourceId: Number, resourceUnit: Number }[]
}