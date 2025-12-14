
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-globales-dropzone',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgxDropzoneModule],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss'
})
export class DropzoneComponent {

files: File[] = [];

onSelect(event: any) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

}
