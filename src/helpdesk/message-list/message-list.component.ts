import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
public list: Array<any> = [];


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log('%cMessageListComponent', 'background-color:green;color:white;');
    this.init();
  }
  ngOnDestroy(): void {
    console.log('%cMessageListComponent', 'background-color:red;color:black;')
  }
  //


  init() {

  }
}


function getId(n) {
  //  http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}