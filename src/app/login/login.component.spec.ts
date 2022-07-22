import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { MenuComponent } from '../menu/menu.component';

describe('Test del componente Login', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                MenuComponent,
                LoginComponent
            ],
        }).compileComponents();
    });

    it('Debe existir el Login Component', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const loginApp = fixture.componentInstance;
        expect(loginApp).toBeTruthy();
    });
});
