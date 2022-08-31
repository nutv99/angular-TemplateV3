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
  selector: '[appDiRect2]',
})
export class DiRect2Directive {
  @Input() myurlcodeA = '';
  @Output() appDiRect2 = new EventEmitter();

  constructor(private http: HttpClient, private elementRef: ElementRef) {}
  //window:load

  @HostListener('click', ['$event']) loadDepartmentA(event: any) {
    console.log('My URL ', this.myurlcodeA);
   // this.myurlcodeA = 'categorymaster';
    const inputTextElement: HTMLInputElement = event.target;
    this.http
      .get<any>(
        'https://www.lovetoshopmall.com/dataservice/service.php?formcode=' +
          this.myurlcodeA +
          '&payload=' +
          inputTextElement.value
      )
      .subscribe((response) => {
        this.appDiRect2.emit(response);
      });
  }
}
