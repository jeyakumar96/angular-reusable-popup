import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopupMessage, PopupType } from './popup.types';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupsSubject = new BehaviorSubject<PopupMessage[]>([]);
  public popups$ = this.popupsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addPopup(popup: PopupMessage): void {
    popup.id = popup.id || this.generateId();
    const currentPopups = this.popupsSubject.value;
    this.popupsSubject.next([...currentPopups, popup]);
  }

  // Generic method to show any type of popup
  show(message: string, type: PopupType, options?: Partial<PopupMessage>): string {
    const popup: PopupMessage = {
      message,
      type,
      title: options?.title,
      duration: options?.duration !== undefined ? options.duration : 5000,
      showCloseButton: options?.showCloseButton !== undefined ? options.showCloseButton : true,
      ...options
    };

    this.addPopup(popup);
    return popup.id!;
  }

  // Convenience methods for different types
  success(message: string, title?: string, duration?: number): string {
    return this.show(message, 'success', { title, duration });
  }

  error(message: string, title?: string, duration?: number): string {
    return this.show(message, 'error', { title, duration: duration || 0 }); // Errors don't auto-close by default
  }

  warning(message: string, title?: string, duration?: number): string {
    return this.show(message, 'warning', { title, duration });
  }

  info(message: string, title?: string, duration?: number): string {
    return this.show(message, 'info', { title, duration });
  }

  // Method to close a specific popup
  close(id: string): void {
    const currentPopups = this.popupsSubject.value;
    const filteredPopups = currentPopups.filter(popup => popup.id !== id);
    this.popupsSubject.next(filteredPopups);
  }

  // Method to close all popups
  closeAll(): void {
    this.popupsSubject.next([]);
  }

  // Method to get current popups
  getPopups(): PopupMessage[] {
    return this.popupsSubject.value;
  }

  // Helper method for custom SVG popups
  showWithSvg(message: string, type: PopupType, svgPath: string, options?: Partial<PopupMessage>): string {
    return this.show(message, type, {
      ...options,
      customIcon: svgPath,
      iconType: 'svg'
    });
  }
}
