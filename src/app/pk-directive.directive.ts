import {
  Directive,
  Input,
  Output,
  ElementRef,
  HostListener,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
  selector: '[appPkDirective]',
})
export class PkDirective {
  @Input() myurlcode = '';
  @Output() appPkDirective = new EventEmitter();

  constructor(private http: HttpClient, private elementRef: ElementRef) {}
  @HostListener('input', ['$event']) loadDepartment(event: any) {
    console.log('My URL ', this.myurlcode);
    const inputTextElement: HTMLInputElement = event.target;  
    this.http
      .get<any>(
        'https://www.lovetoshopmall.com/dataservice/service.php?formcode=' +
          this.myurlcode +
          '&payload=' +
          inputTextElement.value
      )
      .subscribe((response) => {
         this.appPkDirective.emit(response)
      }
      );
  } 

  
}
