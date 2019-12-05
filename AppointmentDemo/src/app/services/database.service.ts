import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
// import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  appointments = new BehaviorSubject([]);
  insertRow = new BehaviorSubject("");
  deleteRow = new BehaviorSubject("");
  updateRow = new BehaviorSubject("");

  constructor(private sqlite: SQLite,private platform: Platform) {
    // Initilize DB Object with DB name
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'appointmentdata.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
      });
    });

   }

   addAppointment(appointmentData): Observable<any> {
     this.addAppointmentIntoDB(appointmentData);
     return this.insertRow.asObservable();
   }

   addAppointmentIntoDB(appointmentData) {
    this.checkAndCreateAppointmentTable().then(() => {
      console.log('Executed SQL');
      this.database.executeSql('INSERT INTO appointments VALUES(NULL,?,?,?,?)', appointmentData)
      .then(res => {
        this.insertRow.next("Data Inserted");
      })
      .catch(e => {
        console.log(e);
        this.insertRow.next(e);
      });
    })
    .catch(e => {
      console.log(e)
      this.insertRow.next(e);
    });
  }

  updateAppointment(appointmentData): Observable<any> {
    this.updateAppointmentIntoDB(appointmentData);
    return this.updateRow.asObservable();
  }

  updateAppointmentIntoDB(appointmentData) {
   this.checkAndCreateAppointmentTable().then(() => {
     console.log('Executed SQL');
     this.database.executeSql('UPDATE appointments set summary = ?, location = ?, startdate = ?, enddate = ? where rowid = ?', appointmentData)
     .then(res => {
       this.updateRow.next("Data Updated");
     })
     .catch(e => {
       console.log(e);
       this.updateRow.next(e);
     });
   })
   .catch(e => {
     console.log(e)
     this.updateRow.next(e);
   });
 }

  checkAndCreateAppointmentTable(){
      return this.database.executeSql('CREATE TABLE IF NOT EXISTS appointments(rowid INTEGER PRIMARY KEY,summary VARCHAR(255),location VARCHAR(255), startdate TEXT,enddate TEXT)', [])
  }

  getAllAppointments(month): Observable<any> {
    this.getAllAppointmentsFromDB(month);
    return this.appointments.asObservable();
  }

  // get all appointments
  getAllAppointmentsFromDB(month) {
    // 
    let appointments = [];
    this.database.executeSql("SELECT * FROM appointments where strftime('%m', startdate) = '" + month + "' ORDER BY rowid DESC",[])
    .then(res => {
      console.log(res.rows);
      for(var i=0; i<res.rows.length; i++) {
        appointments.push({
          rowid:res.rows.item(i).rowid,
          summary: res.rows.item(i).summary,
          location: res.rows.item(i).location,
          startDate: res.rows.item(i).startdate,
          endDate: res.rows.item(i).enddate
        });
      }
      this.appointments.next(appointments);
    })
    .catch(e => {
      console.log(e);
      this.appointments.next(e);
    });
  }

  deleteAppointment(rowid): Observable<any> {
    this.deleteAppointmentFromDB(rowid);
    return this.deleteRow.asObservable();
  }

  // get all appointments
  deleteAppointmentFromDB(rowid) {
    this.database.executeSql("DELETE FROM appointments where rowid=?",[rowid])
    .then(res => {
      this.deleteRow.next("Appointment deleted successfully.");
    })
    .catch(e => {
      console.log(e);
      this.deleteRow.next(e);
    });
  }
}
