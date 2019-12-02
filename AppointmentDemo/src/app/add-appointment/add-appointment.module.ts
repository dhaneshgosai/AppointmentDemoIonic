import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAppointmentPageRoutingModule } from './add-appointment-routing.module';

import { AddAppointmentPage } from './add-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddAppointmentPageRoutingModule
  ],
  declarations: [AddAppointmentPage]
})
export class AddAppointmentPageModule {}
