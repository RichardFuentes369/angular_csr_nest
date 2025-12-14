
import { Component, ViewChild, ElementRef } from '@angular/core'; // Importar ViewChild y ElementRef

@Component({
  selector: 'app-globales-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  url: string | null = null;
  urlToResetInput: boolean = false; // Nueva propiedad para reiniciar el input

  // Usamos @ViewChild para obtener la referencia al input 'fileInput'
  @ViewChild('fileInput') fileInput!: ElementRef;

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        if(typeof(event.target?.result) === 'string'){
          this.url = event.target.result;
          this.urlToResetInput = false; // Resetear después de cargar
        }
      };
    }
  }

  public delete(): void {
    this.url = null; // Limpia la imagen en la vista

    // Forzar la recreación del input para que su estado interno se reinicie
    this.urlToResetInput = true;
    // Esto asegura que Angular tenga un ciclo para destruir y recrear el input
    setTimeout(() => {
      this.urlToResetInput = false;
    }, 0);
  }
}