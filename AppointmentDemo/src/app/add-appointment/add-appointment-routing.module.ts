import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppointmentPage } from './add-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: AddAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAppointmentPageRoutingModule {}
