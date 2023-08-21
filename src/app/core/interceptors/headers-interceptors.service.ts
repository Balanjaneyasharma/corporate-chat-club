import { AuthServiceService } from 'src/app/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { LoaderService } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptorsService implements HttpInterceptor{

  constructor(private loaderService : LoaderService , private authService : AuthServiceService) { }
  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      });
    }
    this.loaderService.showLoader();
    
    return next.handle(request).pipe(
      finalize(()=> this.loaderService.hideLoader())
    );
  }
}

