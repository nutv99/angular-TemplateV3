import { Component, Input } from '@angular/core';

export interface Model_CustomerADD {
  id: string;
  type: string;
  name: string;
  ppu: number;
}

export interface Model_CustomerEdit {
  id: string;
  type: string;    
}
@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
}) 

 
export class HelloComponent  {

  @Input() name: string;

  
  constructor() {}

  ngOnInit() {
    
  }
}
