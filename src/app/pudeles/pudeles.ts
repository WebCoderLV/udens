import { Component, inject, signal } from '@angular/core';
import { UdensServiss } from '../servisi/udens-serviss';

@Component({
  selector: 'app-pudeles',
  standalone: true,
  templateUrl: './pudeles.html',
  styleUrl: './pudeles.css',
})
export class Pudeles {

  udensServiss = inject(UdensServiss);

  visasPudeles() {
    this.udensServiss.iegutPudeles();
  }

  pudelesSignals = signal<Pudeles>({
  
    tilpums: 0, 
    cena: 0
  });

form()


}
