import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pudele } from '../maodeli/pudele';

@Injectable({
  providedIn: 'root'
})
export class UdensServiss {

  http = inject(HttpClient);

  readonly URL: string = "http://localhost:8080/";


  iegutPudeles() {
    this.http.get<Pudele[]>(`${this.URL}api/pudeles`).subscribe({
      next: (pudeles: Pudele[]) => {
        console.log('Pudeles iegutas sekmigi:', pudeles);
      },
      error: (err: any) => {
        console.error('Kļūda iegūstot pudeles:', err);
      }
    })

  }

}
