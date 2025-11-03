import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pudele } from '../maodeli/pudele';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdensServiss {

  http = inject(HttpClient);

  readonly URL: string = "http://localhost:8080/";


  iegutPudeles(): Observable<HttpResponse<Pudele[]>> {
    return this.http.get<Pudele[]>(
      `${this.URL}api/pudeles`,
      {
        observe: 'response'
      })
  }

  pievienotPudeli(pudele: Pudele): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.URL}api/pudeles`, pudele, {
      observe: 'response'
    })
  }

  dzestPudeli(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.URL}api/pudeles/${id}`, {
      observe: 'response'
    });
  }

  atjauninatPudeli(pudele: Pudele): Observable<HttpResponse<void>> {
    return this.http.put<void>(`${this.URL}api/pudeles/${pudele.id}`, pudele, {
      observe: 'response'
    });
  }

}
