import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessage } from '../../popup-message/popup.types';

@Component({
    selector: 'app-popup-warning',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup-warning.component.html',
    styleUrl: './popup-warning.component.scss'
})
export class PopupWarningComponent implements OnInit {
    @Input() popup!: PopupMessage;
    @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'top-right';
    @Output() closePopup = new EventEmitter<string>();

    isVisible = false;
    private autoCloseTimer?: number;

    ngOnInit(): void {
        if (!this.popup.showCloseButton && this.popup.showCloseButton !== false) {
            this.popup.showCloseButton = true;
        }
        if (!this.popup.duration && this.popup.duration !== 0) {
            this.popup.duration = 5000;
        }

        setTimeout(() => (this.isVisible = true), 10);

        if (this.popup.duration > 0) {
            this.autoCloseTimer = window.setTimeout(() => this.close(), this.popup.duration);
        }
    }

    close(): void {
        this.isVisible = false;
        if (this.autoCloseTimer) clearTimeout(this.autoCloseTimer);
        setTimeout(() => this.closePopup.emit(this.popup.id), 300);
    }

    getIconType(): 'text' | 'svg' {
        return this.popup.iconType || (this.popup.customIcon ? 'svg' : 'text');
    }

    getIcon(): string {
        if (this.getIconType() === 'svg' && this.popup.customIcon) return this.popup.customIcon;
        return this.getDefaultIcon();
    }

    getPositionClass(): string {
        return `popup-${this.position}`;
    }

    protected getDefaultIcon(): string { return '⚠'; }
}
