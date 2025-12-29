import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mod-main-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class MainIndexComponent {

  nombre = 'Javier rIcardo bAron fueNTes'
  
}
