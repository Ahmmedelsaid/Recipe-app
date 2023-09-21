import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DropdownDirective, AlertComponent],
  imports: [CommonModule],
  exports: [DropdownDirective, AlertComponent, CommonModule],
})
export class SharedModule {}
