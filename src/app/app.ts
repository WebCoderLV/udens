import { Component, signal } from '@angular/core';
import { Pudeles } from './pudeles/pudeles';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Pudeles, RouterOutlet]
})
export class App {
  protected readonly title = signal('udens');
}
