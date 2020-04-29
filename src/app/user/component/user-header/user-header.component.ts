import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fis-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
