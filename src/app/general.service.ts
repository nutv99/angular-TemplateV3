import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}


takeDataPatch (dataOnForm:any,dataToPatch:any) { 
var st:string  = '{';
var st2:string  = '';

  const r = Object.keys(dataToPatch);
  r.forEach(function (value) {  
      var sKey = value;
      console.log('Data ', dataOnForm.get(sKey).value);
      st = st + '"' + sKey + '" : "' + dataOnForm.get(sKey).value + '",';
  });

  st2 = st.slice(0, -1) + '}';
  dataToPatch = JSON.parse(st2) ;

  return dataToPatch ;


}  
  
}
