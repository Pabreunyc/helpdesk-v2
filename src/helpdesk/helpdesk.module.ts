import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskRoutingModule } from './helpdesk-routing.module';

import { MaterialModule } from 'src/app/_core/material.module';
import { PrimeNGModule } from 'src/app/_core/primeng.module';

import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { H1Component } from './h1/h1.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HelpdeskComponent,
    H1Component,
    MessageListComponent,
    MessageViewComponent,    
  ],
  imports: [
    CommonModule,
    HelpdeskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNGModule,    
  ]
})
export class HelpdeskModule { }
