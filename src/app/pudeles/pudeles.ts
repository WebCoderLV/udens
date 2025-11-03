import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { applyEach, Field, form, required } from '@angular/forms/signals';
import { UdensServiss } from '../servisi/udens-serviss';
import { Daudzpudeles, Pudele } from '../maodeli/pudele';

@Component({
  selector: 'app-pudeles',
  standalone: true,
  imports: [Field],
  templateUrl: './pudeles.html',
  styleUrl: './pudeles.css',
})
export class Pudeles implements OnInit {

  private udensServiss = inject(UdensServiss);

  protected pudelesSignals = signal<Daudzpudeles>({
    pudeluArrajs: [] // Tukš masīvs, kas tiks aizpildīts ngOnInit laikā
  });

  ngOnInit(): void {
    this.udensServiss.iegutPudeles().subscribe({
      next: (response: HttpResponse<Pudele[]>) => {
        const pudeles = response.body;
        if (pudeles && pudeles.length > 0) {
          this.pudelesSignals.update(() => ({
            pudeluArrajs: [...pudeles, this.createTuksaPudele()]
          }));
        } else {
          this.pudelesSignals.set({
            pudeluArrajs: [this.createTuksaPudele()]
          });
        }
      },
      error: (err: any) => {
        console.error('Kļūda iegūstot pudeles:', err);
        this.pudelesSignals.set({
          pudeluArrajs: [this.createTuksaPudele()]
        });
      }
    });
  }

  private createTuksaPudele(): Pudele {
    return {
      materials: '',
      volume: 0,
      garsa: '',
      kategorija: false
    };
  }

  pudelesForma = form(this.pudelesSignals, (formasPath) => {
    applyEach(formasPath.pudeluArrajs, (arajaElementaPath) => {
      required(arajaElementaPath.materials, { message: 'Materiāls ir obligāts lauks' });
    });
  });

  pievienotPudeli(): void {
    const pudeles: Pudele[] = this.pudelesSignals().pudeluArrajs;
    if (pudeles.length === 0) return; // Nav pudeles, ko pievienot - kļūda!
    const pedejaPudele: Pudele = pudeles[pudeles.length - 1];
    this.udensServiss.pievienotPudeli(pedejaPudele).subscribe({
      next: (response) => {
        const newId = response.body;
        if (newId) {
          this.pudelesSignals.update(data => ({
            pudeluArrajs: [
              ...data.pudeluArrajs.slice(0, -1), // Nogriež pēdējo pudeli
              { ...pedejaPudele, id: newId },      // Pievieno pēdējo ar jauno ID
              this.createTuksaPudele()           // Pievieno jaunu, tukšu pudeli
            ]
          }));
        }
      },
      error: (err) => console.error('Kļūda pievienojot pudeli:', err)
    });
  }

  nonemtPudeli(index: number): void {
    const pudeles = this.pudelesSignals().pudeluArrajs;
    const pudeleToDelete = pudeles[index];
    if (pudeleToDelete.id) {
      // Pudele ar ID - dzēst no backend
      this.udensServiss.dzestPudeli(pudeleToDelete.id).subscribe({
        next: (response) => {
          // Pārbaudīt, vai response status ir 200 (veiksmīgs)
          if (response.status === 200) {
            this.pudelesSignals.update((data) => ({
              pudeluArrajs: data.pudeluArrajs.filter((_, i) => i !== index)
            }));
          } else {
            console.error('Neveiksmīgs dzēšanas statuss:', response.status);
          }
        },
        error: (err) => console.error('Kļūda dzēšot pudeli:', err)
      });
    } else {
      // Pudele bez ID - noņem tikai no lokālā masīva
      this.pudelesSignals.update((data) => ({
        pudeluArrajs: [data.pudeluArrajs.filter((_, i) => i !== index), this.createTuksaPudele()].flat()
      }));
    }
  }

  atjauninatPudeli(index: number): void {
    const pudeles = this.pudelesSignals().pudeluArrajs;
    const pudeleToUpdate = pudeles[index];

    if (pudeleToUpdate.id) {
      this.udensServiss.atjauninatPudeli(pudeleToUpdate).subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Pudele veiksmīgi atjaunināta');
          } else {
            console.error('Neveiksmīgs atjaunināšanas statuss:', response.status);
          }
        },
        error: (err) => console.error('Kļūda atjauninot pudeli:', err)
      });
    }
  }

  updateKategorija(index: number, value: boolean): void {
    this.pudelesSignals.update(data => ({
      pudeluArrajs: data.pudeluArrajs.map((pudele, i) =>
        i === index ? { ...pudele, kategorija: value } : pudele
      )
    }));
    this.atjauninatPudeli(index);
  }


}
