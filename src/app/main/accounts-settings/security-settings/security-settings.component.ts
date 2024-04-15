import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecuritySettingsModalComponent } from './component/security-settings-modal/security-settings-modal.component';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent {
  constructor(public dialog: MatDialog) { }

  openSecModalDialog(): void {
    const dialogRefSec = this.dialog.open(SecuritySettingsModalComponent, {
      panelClass: 'custom-login-modal'
    });

    dialogRefSec.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  password: any = 'juandelacruz';
  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


}
