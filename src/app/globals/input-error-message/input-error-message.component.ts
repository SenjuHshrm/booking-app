import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.scss'],
})
export class InputErrorMessageComponent {
  @Input() public form!: FormGroup;
  @Input() public errors: FormErrorMessage[] = [];
}
