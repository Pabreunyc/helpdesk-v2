import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { HelpdeskComponent } from 'src/helpdesk/helpdesk/helpdesk.component';
//import { MessageListComponent } from 'src/helpdesk/message-list/message-list.component';
//import { MessageViewComponent } from 'src/helpdesk/message-view/message-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'helpdesk', loadChildren: () => import('../helpdesk/helpdesk.module').then(m => m.HelpdeskModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
