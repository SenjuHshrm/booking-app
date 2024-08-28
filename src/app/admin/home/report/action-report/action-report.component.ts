import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewReportComponent } from '../view-report/view-report.component';
import { Fullname } from 'src/app/interfaces/profile';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-action-report',
  templateUrl: './action-report.component.html',
  styleUrls: ['./action-report.component.scss'],
})
export class ActionReportComponent {
  isLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService,
    private _report: ReportService
  ) {}

  handleClose(success: boolean, type?: string): void {
    if (this.isLoading) return;
    let data: { success: boolean; type?: string; data?: any } = { success };
    if (type) {
      data.type = type;
      data.data = this.data;
    }
    this.dialogRef.close(data);
  }

  fullName(name: Fullname): string {
    return this._util.constructName(name);
  }

  handleGiveAction(): void {
    this.isLoading = true;
    this.subscription.add(
      this._report.setActions(this.data._id, this.data.type).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.handleClose(true, this.data.type);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      })
    );
  }

  get modalTitle(): string {
    return this.data.type === 'suspend'
      ? 'Suspend'
      : this.data.type === 'terminate'
      ? 'Terminate'
      : 'Warning';
  }

  get actionName(): string {
    return this.data.type === 'suspend'
      ? 'suspend'
      : this.data.type === 'terminate'
      ? 'terminate'
      : 'warn';
  }
}
