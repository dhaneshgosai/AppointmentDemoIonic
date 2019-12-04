import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
})
export class AddAppointmentPage implements OnInit {

  
  minDate : string;
  todayDate: Date;
  appointmentFormGroup : FormGroup;
  appointmentData = { summary: '', location: '', startDate: null, endDate: null };
  summaryAC: AbstractControl;
  locationAC: AbstractControl;
  startDateAC: AbstractControl;
  endDateAC: AbstractControl;

  constructor(public fb: FormBuilder,private db: DatabaseService) { 
    this.todayDate =  new Date();
    this.minDate = new Date().toISOString();
    this.appointmentFormGroup = this.fb.group({
      'summary' : [null, Validators.compose([Validators.required])],
      'location' : [null, Validators.compose([Validators.required])],
      'startDate' : [null, Validators.compose([Validators.required])],
      'endDate' : [null, Validators.compose([Validators.required])]
    });

    this.summaryAC = this.appointmentFormGroup.controls['summary'];
    this.locationAC = this.appointmentFormGroup.controls['location'];
    this.startDateAC = this.appointmentFormGroup.controls['startDate'];
    this.endDateAC = this.appointmentFormGroup.controls['endDate'];
  }

  ngOnInit() {
  }


  addAppointment() {
    let appointmentData = [
      this.appointmentData.summary,
      this.appointmentData.location,
      this.appointmentData.startDate.valueOf(),
      this.appointmentData.endDate.valueOf(),
    ];
    this.db.addAppointment(appointmentData)
    .then(res => {
      console.log(res);
      console.log('insert data successfully');
    })
    .catch(e => {
      console.log('insert data error',e);
    });
  }

}
