import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-index-inicio',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  nombre = 'Javier rIcardo bAron fueNTes'

}
