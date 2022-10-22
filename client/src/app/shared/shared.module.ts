import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialUiModule} from "./material-ui.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialUiModule
  ],
  exports: [
    MaterialUiModule
  ]
})
export class SharedModule { }
