import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { MenuComponent } from './menu.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { rolOutputPipe } from '../pipes/rol.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../shared/material.module';
import { ROOT_REDUCERS } from '../state/app.state';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('Test del componente Menu', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientModule,
            ],
            declarations: [
                MenuComponent
            ],
            providers: [
                Store,
                CookieService,
                Router
            ]
        }).compileComponents();
    });

    it('Debe existir el Menu Component', () => {
        const fixture = TestBed.createComponent(MenuComponent);
        const menuComponent = fixture.componentInstance;
        expect(menuComponent).toBeTruthy();
    });
});
