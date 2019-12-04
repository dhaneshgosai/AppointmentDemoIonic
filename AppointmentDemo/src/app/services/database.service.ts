import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
// import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;

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

   addAppointment(appointmentData) {
    this.checkAndCreateAppointmentTable();
    return this.database.executeSql('INSERT INTO appointments VALUES(NULL,?,?,?,?)', appointmentData);
  }

  checkAndCreateAppointmentTable(){
    
      this.database.executeSql('CREATE TABLE IF NOT EXISTS appointments(rowid INTEGER PRIMARY KEY,summary VARCHAR(255),location VARCHAR(255), startdate TEXT,enddate TEXT)', [])
      .then(() => {
        console.log('Executed SQL');
      })
      .catch(e => console.log(e));
    
  }

  // get all appointments
  getAllAppointments(): Observable<any> {
    let appointments = [];
    this.database.executeSql('SELECT * FROM appointments ORDER BY rowid DESC',[])
    .then(res => {
      console.log(res.rows);
      for(var i=0; i<res.rows.length; i++) {
        appointments.push({
          rowid:res.rows.item(i).rowid,
          summary: res.rows.item(i).summary,
          location: res.rows.item(i).location,
          startDate: res.rows.item(i).startdate,
          endDate: res.rows.item(i).enddate
        })
        return of(appointments);
      }
    })
    .catch(e => {
      console.log(e);
      return of(e);
    });
  }
}
