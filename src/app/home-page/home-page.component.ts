import { Component, OnInit } from '@angular/core';
import { child, get, getDatabase, onValue } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ref } from '@firebase/database';
import { Table } from '../classes/table';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  tabelCreates = new FormGroup ({
    tabelNo: new FormControl(''),
    tabelSituation:new FormControl('')
  })
  newTableNo!:number
  deleteMasaNo!:number
  array!: Array<any>
  deleteTableObj:any
  tables!:Array<any>
  db = getDatabase()
 constructor(private dbService:DbService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const referance= ref(this.db,'tables')

    // get(child(referance,'tables')).then((res)=>{
    //   const array = res.val()
    //   this.tables=array.filter((n:any)=> n)
    //   console.log(this.tables);

    // })
    onValue(referance, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.tables=data.filter((n:any)=> n)

      console.log(this.tables);

    });

  }
tableCreateModal(){
  this.newTableNo=0
  this.tables.forEach((res:any, index:number)=>{
    console.log(res.masaNo);
    if(this.newTableNo==0){
      if(res.masaNo-index !=1){
      this.newTableNo=index+1

    }
    else if(res.masaNo -this.tables.length ==0){
      this.newTableNo= this.tables.length+1
    }
    }
  })
  if(this.newTableNo!=0){
    console.log(this.newTableNo);
  const modal =new bootstrap.Modal(document.getElementById('createTable'))
  const tableNo = document.getElementById('tableNo')
  modal.show()
  }


}

tableCreateFunc(){


  const table = {
    masaNo: this.tabelCreates.value.tabelNo || this.newTableNo,
    masaDurum: this.tabelCreates.value.tabelSituation
  }
  this.dbService.createTable(table)

}
tableControl(table:any){
  const tableDoc = document.getElementById(table.masaNo)
  if(table.masaDurum==1){
    document.getElementById(table.masaNo)!.innerHTML='İlgilenildi'
  }
  else if(table.masaDurum==2){
    tableDoc!.innerHTML='Müşteri Çağırıyor'
  }
  else if(table.masaDurum==3){
    tableDoc!.innerHTML='İlgileniliyor'
  }
  else if(table.masaDurum==4){
    tableDoc!.innerHTML='Sipariş Hazırlanıyor'
  }
  return true
}
  looked(table:any,situation:any){
    const obj ={
      masaNo:table.masaNo,
      masaDurum: situation
    }
    this.dbService.situationUpdate(obj)
  }
  deleteTable(table:any){
    const modal =new bootstrap.Modal(document.getElementById('areYouSure'))
    this.deleteTableObj=table
    this.deleteMasaNo=table.masaNo
    console.log(this.deleteTableObj);

    modal.show()
    // let newTableNo:number=0
    // const val = this.tables.forEach((res:any, index:number)=>{
    //   console.log(res.masaNo);
    //   if(newTableNo==0){
    //     if(res.masaNo-index !=1){
    //     newTableNo=index+1

    //   }
    //   else if(res.masaNo -this.tables.length ==0){
    //     newTableNo= this.tables.length+1
    //   }
    //   }
    // })
  }
  deleteTableModal(){
    this.dbService.dbDeleteTabel(this.deleteTableObj)

  }
  // gettingReady(table:any){
  //   const obj ={
  //     masaNo:table.masaNo,
  //     masaDurum: 'Sipariş Hazırlanıyor'
  //   }

  // }
  // completed(table:any){
  //   const obj ={
  //     masaNo:table.masaNo,
  //     masaDurum: 'İlgilenildi'
  //   }
  // }
  singout() {
    this.authService.signoutService().then(() => {
      this.router.navigate(['login']);
    });
  }
}
