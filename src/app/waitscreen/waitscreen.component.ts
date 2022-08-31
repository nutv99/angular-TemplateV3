import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-waitscreen',
  templateUrl: './waitscreen.component.html',
  styleUrls: ['./waitscreen.component.css'],
})
export class WaitscreenComponent implements OnInit {
  @Input() waitScreenShow: boolean;

  constructor() {}

  ngOnInit() {}
}
