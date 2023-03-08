
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FilterSettingsModel,
  GanttComponent,
} from '@syncfusion/ej2-angular-gantt';
import { tap, finalize, takeUntil, Subject } from 'rxjs';
import { EventService } from '../event.service';
import { meetingEvent, offEvent, syncChartData } from '../models/offEvent.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public ganttObject!: GanttComponent;
  private unsubscribe$ = new Subject();
  public timelineView: object = { timelineViewMode: 'Week' };
  public showData = false;
  public count = 0;
  public columns: object[] = [];
  public resources: {}[] = [];
  public resourceCount = 0;
  public tooltipSettings!: object;
  public labelSettings!: object;
  public latestCustomToolTipName!: string;
  public dateFilterStartDate = this.setFromDate()
  public dateFilterEndDate = this._date.transform(new Date(), 'yyyy-MM-dd')

  public taskSettings: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    durationUnit: 'DurationUnit',
    child: 'subTasks',
    resourceInfo: 'resources',
    expandState: 'isExpand',
    isAllDay: 'isAllDay',
  };
  public resourceFields: object = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup',
  };

  public userEventsData: syncChartData[] = [];

  public userDetail!: string;

  constructor(public _events: EventService, private _date: DatePipe) { }

  ngOnInit(): void {
    this.getEventsDetails();
    this.tooltipSettings = {
      showTooltip: true,
    };
    this.columns = [
      { field: 'TaskID', visible: false },
      { field: 'TaskName', visible: true },
    ];
  }


  private setFromDate() {
    const date = new Date();
    if (!date.getMonth()) {
      return this._date.transform(new Date(date.getFullYear() - 1, 11, date.getDate()), 'yyyy-MM-dd') ?? ''
    }
    return this._date.transform(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()), 'yyyy-MM-dd') ?? ''
  }

  private getEventsDetails() {
    this._events
      .calendarEventWithParams(this.dateFilterStartDate, this.dateFilterEndDate)
      .pipe(
        tap({
          next: (data: offEvent[]) => {
            console.log(data);
            this.resources = [];
            this.userEventsData = []
            data.forEach((x: offEvent) => {
              this.resources.push({
                resourceId: this.resourceCount++,
                resourceName: x.userName,
                resourceGroup: x.userName,
                isExpand: false,
              });
              const subTasks: syncChartData[] = [];
              if (x.oofEvents) {
                x.oofEvents.forEach((eventDetails: meetingEvent) => {
                  let subSyncRecord: syncChartData = {
                    TaskID: eventDetails.isAllDay ? 1 : 0,
                    TaskName: x.userName,
                    StartDate: this.setDate(eventDetails.isAllDay, eventDetails.start!.dateTime),
                    EndDate: this.setDate(eventDetails.isAllDay, eventDetails.end?.dateTime ?? eventDetails.start!.dateTime),
                    resources: [
                      { resourceId: this.resourceCount - 1, resourceUnit: 0 },
                    ],
                  };
                  subTasks.push(subSyncRecord);
                });
              }
              if (subTasks.length) {
                const syncRecord: syncChartData = {
                  TaskID: this.count++,
                  TaskName: x.userName,
                  StartDate: subTasks[0].StartDate,
                  isAllDay: true,
                  EndDate: subTasks[subTasks.length - 1].EndDate,
                  subTasks: subTasks,
                };
                this.userEventsData.push(syncRecord);
              }
            });
            this.showData = true;
          },
          error: (error: Error) => console.log(error),
        }),
        finalize(() => (this.isLoading = false)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  public onDateChange() {
    this.showData = false
    this.getEventsDetails()
  }
  public customTooltip(data: any): string {
    this.latestCustomToolTipName = data.TaskName;
    let startDate: Date = data.StartDate;
    let endDate: Date = data.EndDate;
    if (!data.TaskID) {
      return `${startDate.getDate()} ${this.getMonthName(startDate.getMonth())} - ${endDate.getDate()} ${this.getMonthName(endDate.getMonth())}  ( ${startDate.getHours()}.${startDate.getMinutes()} : ${endDate.getHours()}.${endDate.getMinutes()} )`
    }
    else {
      return `${startDate.getDate()} ${this.getMonthName(startDate.getMonth())} - ${endDate.getDate()} ${this.getMonthName(endDate.getMonth())}`
    }
  }

  public queryTaskbarInfo(args: any) {
    if (args.data['TaskID'] == 1) {
      args.taskbarBgColor = 'rgb(37, 23, 73)'
      args.taskbarBorderColor = 'rgb(37, 23, 73)'
    }
    else {
      args.taskbarBgColor = 'rgb(234, 4, 126)'
      args.taskbarBorderColor = 'rgb(234, 4, 126)'
    }
  }

  private setDate(isAllDay: boolean, dateString: string): Date {
    const date = new Date(dateString);
    if (isAllDay) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    }
    else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0)
    }

  }

  private getMonthName(month: number) {
    switch (month) {
      case 0: {
        return 'Jan'
      };
      case 1: {
        return 'Feb'
      };
      case 2: {
        return 'Mar'
      };
      case 3: {
        return 'Apr'
      };
      case 4: {
        return 'May'
      };
      case 5: {
        return 'Jun'
      };
      case 6: {
        return 'Jul'
      };
      case 7: {
        return 'Aug'
      };
      case 8: {
        return 'Sep'
      };
      case 9: {
        return 'Oct'
      };
      case 10: {
        return 'Nov'
      };
      case 11: {
        return 'Dec'
      };
      default:
        return ''
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
