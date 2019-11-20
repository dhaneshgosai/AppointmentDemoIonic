import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  appointments: any = [];
  constructor(private sqlite: SQLite) {
    // this.saveData();
  }

  saveData(){
    this.sqlite.create({
      name: 'appointmentdata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('CREATE TABLE IF NOT EXISTS appointments(rowid INTEGER PRIMARY KEY,name VARCHAR(32))', [])
          .then(() => {
            console.log('Executed SQL');
          })
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

  insertData(title){

    this.sqlite.create({
      name: 'appointmentdata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
  
      db.executeSql('INSERT INTO appointments VALUES(NULL,?)',[title])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => {
        console.log('insert data error',e);
      });
    })
    .catch(e => console.log(e));
  }

  public getData() {
    this.sqlite.create({
      name: 'appointmentdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM appointments ORDER BY rowid DESC',[])
    .then(res => {
      console.log(res.rows);
      this.appointments = res.rows;
      // let filedir = this.file.documentsDirectory  + 'SavedPhotos/';
      // for(var i=0; i<res.rows.length; i++) {
      //   // console.log("Inner loop :",res.rows.item(i).imagepath)
      //   this.photolist.push({
      //     rowid:res.rows.item(i).rowid,
      //     imagename: this.win.Ionic.WebView.convertFileSrc(filedir + res.rows.item(i).imagename),
      //     imagepath:this.win.Ionic.WebView.convertFileSrc(res.rows.item(i).imagepath),
      //     isChecked:false
      //   })
      // }
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
