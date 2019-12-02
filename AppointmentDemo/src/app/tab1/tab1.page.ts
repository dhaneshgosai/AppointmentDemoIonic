import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  appointments: any = [];
  constructor(private sqlite: SQLite, public router: Router) {
    this.saveData();
  }

  saveData(){
    this.sqlite.create({
      name: 'appointmentdata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('CREATE TABLE IF NOT EXISTS appointments(rowid INTEGER PRIMARY KEY,summary VARCHAR(255),location VARCHAR(255), startdate TEXT,enddate TEXT)', [])
          .then(() => {
            console.log('Executed SQL');
          })
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

  insertData(title){
    this.router.navigate(['/add-appointment'])
  }

  public getData() {
    this.appointments = [];
    this.sqlite.create({
      name: 'appointmentdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM appointments ORDER BY rowid DESC',[])
    .then(res => {
      console.log(res.rows);
      // let filedir = this.file.documentsDirectory  + 'SavedPhotos/';
      for(var i=0; i<res.rows.length; i++) {
        // console.log("Inner loop :",res.rows.item(i).imagepath)
        this.appointments.push({
          rowid:res.rows.item(i).rowid,
          summary: res.rows.item(i).summary,
          location: res.rows.item(i).location,
          startDate: res.rows.item(i).startdate,
          endDate: res.rows.item(i).enddate
        })
      }
    })
    .catch(e => console.log(e));
}).catch(e => {
  console.log('DB connection error',e);
  // this.toast.show(e, '5000', 'center').subscribe(
  //   toast => {
  //     console.log(toast);
  //   }
  // );
});
  }

}
