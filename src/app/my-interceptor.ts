import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, 
        HttpHandler,
        HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';      

@Injectable()

export class MyInterceptor implements HttpInterceptor { 

  constructor(){}
     
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor ran..');
    
    return next.handle(req);
  }
}

