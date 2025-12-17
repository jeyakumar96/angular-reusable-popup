import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupWarningComponent } from './popup-warning.component';

describe('PopupWarningComponent', () => {
    let component: PopupWarningComponent;
    let fixture: ComponentFixture<PopupWarningComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopupWarningComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PopupWarningComponent);
        component = fixture.componentInstance;
        component.popup = { message: 'Warning!', type: 'warning' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
