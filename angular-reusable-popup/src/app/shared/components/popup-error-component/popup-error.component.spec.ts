import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupErrorComponent } from './popup-error.component';

describe('PopupErrorComponent', () => {
    let component: PopupErrorComponent;
    let fixture: ComponentFixture<PopupErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopupErrorComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PopupErrorComponent);
        component = fixture.componentInstance;
        component.popup = { message: 'Error!', type: 'error' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
