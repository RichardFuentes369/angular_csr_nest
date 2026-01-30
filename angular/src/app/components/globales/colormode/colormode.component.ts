import { Component } from '@angular/core';

@Component({
  selector: 'app-globales-colormode',
  standalone: true,
  templateUrl: './colormode.component.html',
  styleUrl: './colormode.component.scss',
})
export class ColormodeComponent {

  toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme)
  };

}
