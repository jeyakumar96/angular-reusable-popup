import { Component } from '@angular/core';
import { PopupContainerComponent, PopupService } from "./shared/components/popup-container.component/popup-container-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PopupContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-reusable-popup';

  constructor(private popupService: PopupService) { }

  showSuccessPopup() {
    this.popupService.success('Operation completed successfully!', 'Success');
  }

  showErrorPopup() {
    this.popupService.error('Something went wrong. Please try again.', 'Error');
  }

  showWarningPopup() {
    this.popupService.warning('Please check your input before proceeding.', 'Warning');
  }

  showInfoPopup() {
    this.popupService.info('Here is some important information for you.', 'Information');
  }

  showCustomPopup() {
    this.popupService.show(
      'This is a custom popup with SVG icon!',
      'success',
      {
        title: 'Custom Popup',
        duration: 5000, //see the progress bar
        showCloseButton: true,
        customIcon: 'assets/icons/pop-up-check-circle.svg',
        iconType: 'svg'
      }
    );
  }


}
