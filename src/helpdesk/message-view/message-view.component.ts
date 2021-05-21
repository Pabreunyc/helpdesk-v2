import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('%cMessageViewComponent', 'background-color:green;color:white;')
  }
  ngOnDestroy(): void {
    console.log('%cMessageViewComponent', 'background-color:red;color:black;')
  }
  //===========================================================================
}
