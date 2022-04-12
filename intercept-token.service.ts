import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes("spotify.com")) {
      // clone the request and use the "setHeaders" property to set an "Authorization" header
      request = request.clone({
        setHeaders: {
    // This will ensure that we only set the "JWT" authorization for requests going to our User API 
    // and all requests going to spotify.com will continue to use the "Bearer" authorization
          Authorization: `JWT ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}

// GO TO app.module.ts > providers array