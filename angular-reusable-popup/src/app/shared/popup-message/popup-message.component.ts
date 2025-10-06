import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PopupType = 'success' | 'error' | 'warning' | 'info';

export interface PopupMessage {
  id?: string;
  title?: string;
  message: string;
  type: PopupType;
  duration?: number; // Duration in milliseconds (0 means no auto-close)
  showCloseButton?: boolean;
  customIcon?: string; // Path to custom SVG icon
  iconType?: 'text' | 'svg'; // Type of icon to display
}

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent implements OnInit {
  @Input() popup!: PopupMessage;
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'top-right';
  @Output() closePopup = new EventEmitter<string>();

  isVisible = false;
  private autoCloseTimer?: number;

  ngOnInit() {
    // Set default values
    if (!this.popup.showCloseButton && this.popup.showCloseButton !== false) {
      this.popup.showCloseButton = true;
    }
    if (!this.popup.duration && this.popup.duration !== 0) {
      this.popup.duration = 5000; // Default 5 seconds
    }

    // Show popup with animation
    setTimeout(() => {
      this.isVisible = true;
    }, 10);

    // Auto close if duration is set
    if (this.popup.duration > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.close();
      }, this.popup.duration);
    }
  }

  close() {
    this.isVisible = false;

    // Clear auto-close timer if exists
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }

    // Emit close event after animation
    setTimeout(() => {
      this.closePopup.emit(this.popup.id);
    }, 300);
  }

  getIcon(): string {
    // If custom icon is provided, return it
    if (this.popup.customIcon) {
      return this.popup.customIcon;
    }

    // Default text icons
    switch (this.popup.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }

  getIconType(): 'text' | 'svg' {
    return this.popup.iconType || 'text';
  }

  isCustomIcon(): boolean {
    return !!this.popup.customIcon;
  }

  getTypeClass(): string {
    return `popup-${this.popup.type}`;
  }

  getPositionClass(): string {
    return `popup-${this.position}`;
  }
}
