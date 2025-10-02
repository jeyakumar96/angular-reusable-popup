import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PopupService } from './popup.service';
import { PopupMessageComponent, PopupMessage } from './popup-message.component';

@Component({
    selector: 'app-popup-container',
    standalone: true,
    imports: [CommonModule, PopupMessageComponent],
    template: `
    <div class="popup-container-wrapper">
      <app-popup-message
        *ngFor="let popup of popups$ | async; trackBy: trackByPopupId"
        [popup]="popup"
        [position]="position"
        (closePopup)="onClosePopup($event)">
      </app-popup-message>
    </div>
  `,
    styles: [`
    .popup-container-wrapper {
      position: relative;
      z-index: 9999;
    }
  `]
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
