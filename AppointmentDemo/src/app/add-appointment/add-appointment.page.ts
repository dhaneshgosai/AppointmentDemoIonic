import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  isEdit = false;
  selectedRowId : string;

  constructor(public fb: FormBuilder,
    private db: DatabaseService,
    private route: ActivatedRoute,
    private navCtrl: NavController, ) { 
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

    this.route.params.subscribe(params => {
      let appointment = JSON.parse(params.data);
      if (appointment !== undefined) {
        this.appointmentData.summary = appointment.summary;
        this.appointmentData.location = appointment.location;
        this.appointmentData.startDate = appointment.startDate;
        this.appointmentData.endDate = appointment.endDate;
        this.selectedRowId = appointment.rowid;
        this.isEdit = true;
      } 
    });
  }

  ngOnInit() {
  }


  addAppointment() {
    
    

    if (this.isEdit) {

      let appointmentData = [
        this.appointmentData.summary,
        this.appointmentData.location,
        moment(this.appointmentData.startDate).format("YYYY-MM-DD"),
        moment(this.appointmentData.endDate).format("YYYY-MM-DD"),
        this.selectedRowId
      ];

      this.db.updateAppointment(appointmentData).subscribe(data => {
        if (data instanceof Error) {
          console.log('insert data error',data);
        } else {
          console.log('insert data successfully');
          this.navCtrl.navigateBack('/');
        }
      });
    } else {

      let appointmentData = [
        this.appointmentData.summary,
        this.appointmentData.location,
        moment(this.appointmentData.startDate).format("YYYY-MM-DD"),
        moment(this.appointmentData.endDate).format("YYYY-MM-DD")
      ];
      this.db.addAppointment(appointmentData).subscribe(data => {
        if (data instanceof Error) {
          console.log('insert data error',data);
        } else {
          console.log('insert data successfully');
          this.navCtrl.navigateBack('/');
        }
      });
    }
    
  }

}
