import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageViewComponent } from './message-view/message-view.component';

const routes: Routes = [{ 
    path: '', 
    component: HelpdeskComponent,
    children: [
      { path: 'listing', component: MessageListComponent },
      { path: 'view', component: MessageViewComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskRoutingModule { }
