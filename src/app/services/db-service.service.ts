import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { onValue, remove, update } from '@angular/fire/database';
import { get, getDatabase, ref, set } from '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db = getDatabase()
  constructor( private firebase:FirebaseApp) { }

  createTable(table:any){
    const referance= ref(this.db,'tables/'+table.masaNo)
    update(referance,table)
  }
  situationUpdate(table:any){
    const referance = ref(this.db,'tables/'+table.masaNo)
    update(referance,table)
  }
  dbDeleteTabel(table:any){
    const referance = ref(this.db,'tables/'+table.masaNo)
    remove(referance)
  }
}
