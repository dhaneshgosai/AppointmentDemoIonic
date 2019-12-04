import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  appointments: any = [];
  constructor(public router: Router, private db: DatabaseService) {
    // this.saveData();
  }

  insertData(title){
    this.router.navigate(['/add-appointment'])
  }

  getAllAppointments(){
    this.db.getAllAppointments
  }
  

}
