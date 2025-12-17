import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupSuccessComponent } from './popup-success.component';

describe('PopupSuccessComponent', () => {
    let component: PopupSuccessComponent;
    let fixture: ComponentFixture<PopupSuccessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopupSuccessComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PopupSuccessComponent);
        component = fixture.componentInstance;
        component.popup = { message: 'Success!', type: 'success' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
