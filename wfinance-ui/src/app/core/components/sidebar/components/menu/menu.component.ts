import {Menu} from './menu.model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  @Input() menu: Menu;
  
  constructor() {
  }
  
  ngOnInit(): void {
  }
  
}
