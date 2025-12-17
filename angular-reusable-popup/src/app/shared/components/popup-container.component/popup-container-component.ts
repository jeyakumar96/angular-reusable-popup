import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PopupSuccessComponent } from '../popup-success-component/popup-success.component';
import { PopupErrorComponent } from '../popup-error-component/popup-error.component';
import { PopupInfoComponent } from '../popup-info-component/popup-info.component';
import { PopupWarningComponent } from '../popup-warning-component/popup-warning.component';
import { PopupMessage, PopupService } from '../../popup-message';


@Component({
  selector: 'app-popup-container',
  standalone: true,
  imports: [CommonModule, PopupSuccessComponent, PopupErrorComponent, PopupInfoComponent, PopupWarningComponent],
  templateUrl: './popup-container-component.html',
  styleUrls: ['./popup-container-component.scss']
})
export class PopupContainerComponent {
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'top-right';

  popups$: Observable<PopupMessage[]>;

  constructor(private popupService: PopupService) {
    this.popups$ = this.popupService.popups$;
  }

  onClosePopup(id: string): void {
    this.popupService.close(id);
  }

  trackByPopupId(index: number, popup: PopupMessage): string {
    return popup.id || index.toString();
  }
}
export { PopupService };

