import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { AlertToastService } from '@_core/services/alert-toast.service';

import { Observable, BehaviorSubject, Subject, of, throwError, EMPTY } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { HelpdeskTicket } from '@_core/models/helpdesk-ticket';
//import * as HelpdeskJSON from '../../assets/data/100_randomUsers.json'
import { tick } from '@angular/core/testing';

export interface IHelpdeskTicket {
  id: number,
  userId: number,
  assignedTo: number,
  subject: string,
  description: string,
  dateCreated: string,
  status: number,
  productId: number,
  categoryId: number,
  priorityId: number,
  title: string
  department: string,
  phone: string
}
export interface IHelpdeskComment {
  id: number,
  ticketId: number,
  userId: number,
  dateCreated: string,
  type: string,
  comment: string,
  internal_note: string
}
export interface IHelpdeskAttachment {
  id: number,
  ticketId: number,
  commentId: number,
  userId: number,
  filename: string,
  filepath: string,
  filesize: number,
  filetype: string,
  dateCreated: string
}

@Injectable({
  providedIn: 'root'
})
export class HelpdeskTicketsService {
static readonly TICKET_STORE = 'hdTickets';

// selected ticket event bus
@Output() currentTicket$: EventEmitter<number> = new EventEmitter();
@Output() refresh$: EventEmitter<any> = new EventEmitter();

private HELPDESK_URL;
private instanceVersion;
private ticketList;
private _ticketList$: BehaviorSubject<[any]>;
private _selectedTicket$: Subject<CustomEvent> = new Subject();
private statusList;

private jsonapi$: Subject<CustomEvent> = new Subject();

// public ticketMeta$: asObservable;

  constructor(
    private http: HttpClient, 
    alertToastService: AlertToastService
  ) {
    this.HELPDESK_URL = environment.apiUrl + '/helpdeskv2/';    
  }

  getTicketList(catId, userId): Observable<any> {
    catId = catId || 0;
    return this.http.get(this.HELPDESK_URL + `tickets/${catId}/${userId}`)
      .pipe(
        tap(e => console.log('>>>>>', e) ),
        map( e => {
          e[0] = e[0].map(o => {
            o['priority_desc_short'] = o['priority_desc'].slice(o['priority_desc'].lastIndexOf(' ') + 1);
            return o;
          });
          return e;
        }),
        catchError( err => {
          //console.log('this.getTicketList', err);
          return throwError(err);
        })
      );
  }
  getTicket(id): any {
    const inId = id;
    id = isNaN(parseInt(id)) ? 0 : parseInt(id);
    if( id == 0 )
      return throwError( {message: `Invalid ID: "${inId}"`} );

    return this.http.get(this.HELPDESK_URL + 'ticket/' + id)
      .pipe(
        map( d => {
          // ticket - [0]:ticket [1]:comments [2]:attachments

          let ticket = d[0][0];
          ticket.comments = d[1].map( e => {
            e['roles'] = e.role.split(',');
            return e;
          });
          ticket.attachments = d[2].map( e => {
            e['value'] = e.id;
            e['label'] = `${e.username}:: ${e.filename}, ${e.filesize} - (${e.id})`;
            return e;
          });
          //  .log(ticket); debugger;
          return ticket;
        }),        
        catchError( err => {
          return throwError(err);
        }),
      );
  }

  getTicketMeta(): Observable<any> {
    return this.http.get(this.HELPDESK_URL + 'ticket/meta')
      .pipe(
        map( (d:any[]) => {
          let ret = {};
          d.map(e => {
            if(!ret.hasOwnProperty(e.meta))
              ret[e.meta] = [];
            e['value'] = e.id;
            ret[e.meta].push(e);
          });
          return ret;
        })
      );
  }
  getTicketMeta2(): Observable<any> {
    return this.http.get(this.HELPDESK_URL + 'ticket/meta2');
  }

  createTicket(ticket) {
    const fd = new FormData();  
    delete ticket.action
    delete ticket.id;

    return this.http.post(this.HELPDESK_URL + 'ticket', ticket);
  }
  
  addComment(ticketId, comment) {  
    return this.http.post(this.HELPDESK_URL + 'ticket/' + ticketId + '/comment', comment);
  }

  updateTicketStatus(id, newStatus) {
    id = parseInt(id) ? parseInt(id) : 0;
    newStatus = parseInt(newStatus) ? parseInt(newStatus) : 0;

    if(id===0 || newStatus ===0)
      return throwError('Illegal ID');

    return this.http.post(this.HELPDESK_URL +  `ticket/${id}/status`, {ticketId:id, newStatus:newStatus})
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadAttachment_v2(data) {
    const {username, module, file} = data;
    return of(true);
  }
  uploadAttachment(files: File[], ticketId:number) {
    const data: FormData = new FormData();
  
    if(!files.length || ticketId===0) {
      return throwError('No files or invalid ticketId');
    }

    data.append('ticketId', ticketId + '');
    for(let f of files)
      data.append('file', f);

    //{ reportProgress: true, responseType: 'text' }
    //const newRequest = new HttpRequest('POST', this.HELPDESK_URL + `ticket/${ticketId}/attachment`, data);
    //returns: d.insertId
    //return this.http.request(newRequest).pipe( tap(d => console.log('tap.tap', d)) );
    return this.http.post(this.HELPDESK_URL + `ticket/${ticketId}/attachment`, data);
  }
  addAttachment(attachments: any[]) {
    if(attachments.length == 0)
      return throwError('No Attachments');

    return this.http.post(this.HELPDESK_URL + 'ticket/addAttachment', attachments);
  }
  getAttachment(attachmentId: any):Observable<any> {
    attachmentId = parseInt(attachmentId);
    if(!attachmentId)
      return throwError('Invalid ID');

    return this.http.get(this.HELPDESK_URL + '/ticket/attachment/' + attachmentId, {responseType: 'blob'});
  }

  downloadAttachment(data) {
    const {username, attachmentId, module} = data;
    // helpdeskv2/ticket/attachment/getAttachment/18

    return this.http.get(this.HELPDESK_URL + `/ticket/attachment/getAttachment/${attachmentId}`);
  }

  hasAdminPriv(role:string[]):boolean { 
    const adminRoles = ['admin', 'helpdeskadmin'];
    const r = role.map( e => e.toLowerCase());
      
    //return adminRoles.filter( e => r.includes(e) ).length > 0;
    let ret = role.find((e, i) => {
      return e === 'Admin' || e.indexOf('HelpdeskAdmin') >= 0;
    });
    return ret != undefined; 
  }

  private apiCreateTicket(ticket) {
    let t;
    t.id            = ticket.id;
    t.userId        = ticket.id;
    t.assignedTo    = ticket.assignedTo;
    t.dateCreated   = ticket.dateCreated;

    t.status        = ticket.status;
    t.productId   = parseInt(ticket.selectedProduct);
    t.categoryId  = parseInt(ticket.selectedCategory);
    t.priorityId  = parseInt(ticket.selectedPriority);

    t.subject     = ticket.subject.trim();
    t.description = ticket.newComment.trim();

    t.phone = ticket.user.phone.trim();
    t.title = ticket.user.title.trim();
    t.department = ticket.user.department.trim();

    return t;
  }
  /* **************************************************************************
  **  inter component
  ************************************************************************** */
  currentTicket(id) {
    // put selected ticket on event bus
    id = parseInt(id) || 0;
    this.currentTicket$.emit(id);
  }
  refreshTicketList(data) {
    this.refresh$.emit(data);
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

  }
}
