import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  getLogo(){
   const storage = ref(getStorage(),'myLogo/logo.jpg')
   return getDownloadURL(storage).then((res)=>{
    console.log(res);

  })
  }

}
