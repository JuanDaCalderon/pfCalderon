import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from '../header-toolbar/header-toolbar.component';
import { MaterialModule } from './material.module';
@NgModule({
    declarations: [
        HeaderToolbarComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        HeaderToolbarComponent,
    ]
})
export class HeaderModule { }