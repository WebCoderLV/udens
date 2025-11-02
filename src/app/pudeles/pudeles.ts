import { Component, inject, signal } from '@angular/core';
import { applyEach, Field, form, required } from '@angular/forms/signals';
import { UdensServiss } from '../servisi/udens-serviss';
import { Pudele } from '../maodeli/pudele';

type Daudzpudeles = {
  pudeluArrajs: Pudele[];
}

@Component({
  selector: 'app-pudeles',
  standalone: true,
  imports: [Field],
  templateUrl: './pudeles.html',
  styleUrl: './pudeles.css',
})
export class Pudeles {

  private udensServiss = inject(UdensServiss);

  private createTuksaPudele(): Pudele {
    return {
      materials: '',
      volume: 0,
      garsa: '',
      kategorija: false
    };
  }

  protected pudelesSignals = signal<Daudzpudeles>({
    pudeluArrajs: [this.createTuksaPudele()]
  });

  pudelesForma = form(this.pudelesSignals, (formasPath) => {
    applyEach(formasPath.pudeluArrajs, (arajaElementaPath) => {
      required(arajaElementaPath.materials, { message: 'Materiāls ir obligāts lauks' });
    });
  });

  pievienotPudeli(): void {
    this.pudelesSignals.update((data) => ({
      pudeluArrajs: [...data.pudeluArrajs, this.createTuksaPudele()]
    }));
  }
  nonemtPudeli(index: number): void {
    this.pudelesSignals.update((data) => ({
      pudeluArrajs: data.pudeluArrajs.filter((_, i) => i !== index)
    }));
  }



}
