import { Component, inject, signal } from '@angular/core';
import { UdensServiss } from '../servisi/udens-serviss';
import { Pudele } from '../maodeli/pudele';
import { form } from '@angular/forms/signals';

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

  pudelesForma = form(signal<Pudele>({
    materials: '',
    volume: 0,
    garsa: '',
    kategorija: false
  }))


}
