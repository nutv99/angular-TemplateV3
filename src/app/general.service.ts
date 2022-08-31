import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralServiceByNoom {
constructor() {}


takeDataPatchByModel (dataOnForm:any,dataToPatch:any) { 
var stJson:string  = '{';
var st2:string  = '';

  const r = Object.keys(dataToPatch);
  r.forEach(function (value) {  
      var sKey = value;
      console.log('Data ', dataOnForm.get(sKey).value);
      stJson = stJson + '"' + sKey + '" : "' + dataOnForm.get(sKey).value + '",';
  });

  st2 = stJson.slice(0, -1) + '}';
  dataToPatch = JSON.parse(st2) ;

  return dataToPatch ;

}

takeDataPatchByAttribute () { 
  var stJson:string  = '{';
  var st2:string  = '';
  var elemTemp : HTMLInputElement ;
  var dataToPatch : any ;
  
  const refs = document.querySelectorAll(`[modepatch*="y"]`);
  
  for (let i = 0; i <= refs.length-1; i++) {
    // console.log(refs[i].id);
    elemTemp = document.getElementById(refs[i].id) as HTMLInputElement; 
    stJson = stJson + '"' + refs[i].id + '" : "' +  elemTemp.value + '",' ;
    // console.log('stJson',stJson) ;
  }
  
  st2 = stJson.slice(0, -1) + '}';
  dataToPatch = JSON.parse(st2) ;  
  return dataToPatch ;
  
  }

  
}
