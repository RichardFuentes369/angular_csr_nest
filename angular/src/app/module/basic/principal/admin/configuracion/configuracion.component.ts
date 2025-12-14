import { Component } from '@angular/core';
import { AvatarComponent } from '@component/globales/avatar/avatar.component';
import { DropzoneComponent } from '@component/globales/dropzone/dropzone.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [TranslateModule, AvatarComponent, DropzoneComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {

}
