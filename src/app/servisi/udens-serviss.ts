import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pudele } from '../maodeli/pudele';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdensServiss {

  http = inject(HttpClient);

  readonly URL: string = "http://localhost:8080/";


  iegutPudeles() {
    return this.http.get<Pudele[]>(`${this.URL}api/pudeles`).subscribe({
      next: (pudeles: Pudele[]) => {
        console.log('Pudeles iegutas sekmigi:', pudeles);
        return pudeles;
      },
      error: (err: any) => {
        console.error('Kļūda iegūstot pudeles:', err);
      }
    });
  }

  pievienotPudeli(pudele: Pudele): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.URL}api/pudeles`, pudele, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response'
    })
  }

}
