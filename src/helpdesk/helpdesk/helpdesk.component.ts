import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit, OnDestroy {
public tabLoadTimes: Date[] = [];
public links: Array<any> = [];
public activeLink = null;

  constructor() { }

  ngOnInit(): void {
    console.log('%cHelpdeskComponent', 'background-color:green;color:white;')
    this.links = [
      { linkText: "Message List", link:'listing' },
      { linkText: "Message Pane", link:['view'] }
    ];
  }
  ngOnDestroy(): void {
    console.log('%cHelpdeskComponent', 'background-color:red;color:black;')
  }
  // ==========================================================================

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
