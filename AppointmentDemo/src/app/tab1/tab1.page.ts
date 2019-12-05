import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Platform, AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  appointments: any = [];
  selectedMonth  = "current";
  constructor(public router: Router, 
    private db: DatabaseService,
    private platform: Platform,
    private alertCtrl : AlertController) {
   this.db.setDbObject(); 
  }

  ngOnInit(){
    console.log("ngOnInit");
    
    
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.platform.ready().then(() => {
      console.log("platform.ready");
      setTimeout(() => {
        this.getAllAppointments();
      }, 100);
    });
  }
  insertData(){
    this.router.navigate(['/add-appointment'])
  }

  changeAppointmentFetchBy(selectedmonth){
    this.selectedMonth = selectedmonth;
    this.getAllAppointments();
  }

  getAllAppointments(){
    //clear prev data
    this.appointments = [];
    let month = moment().month() + 1;
    if (this.selectedMonth === "current") {
      
    } else if (this.selectedMonth === "prev") {
      if (month === 1) {
        month = 12;
      } else {
        month--;
      }
    } else {
      if (month === 12) {
        month = 1;
      } else {
        month++;
      }
    }

    this.db.getAllAppointments(('0' + month).slice(-2)).subscribe( data => {
      if (data instanceof Error) {
        console.log("Error");
      } else {
        console.log("Data:",data);
        this.appointments = data;
      }
    });
  }

  appointmentClicked(i){
    let appointment = this.appointments[i];
    this.router.navigate(['/add-appointment', {data:JSON.stringify(appointment)}]);
  }

  async deleteAppointment(i){
    let appointment = this.appointments[i];
    const confirm = await this.alertCtrl.create({
      header: 'Delete Appointment',
      subHeader: '',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.db.deleteAppointment(appointment.rowid).subscribe( data => {
                if (data instanceof Error) {
                  console.log("Error");
                } else {
                  // var index = this.appointments.findIndex(item => item.rowid === appointment.rowid)
                  // console.log('Delete Index',index);
                  this.getAllAppointments();
                }
              });
              confirm.dismiss();
              
            }
        }
        ]
      });
    await confirm.present();
    
  }
  

}
