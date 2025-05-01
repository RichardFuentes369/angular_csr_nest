import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextoPipe } from './acortador/texto.pipe';


@NgModule({
  declarations: [
    TextoPipe
  ],
  exports: [
    TextoPipe
  ]
})
export class PipesModule { }
