# Angular Reusable Popup

A comprehensive, reusable popup/notification system for Angular applications with multiple types (Success, Error, Warning, Info), animations, and flexible positioning.

## Features

- ✨ **Multiple Types**: Success, Error, Warning, Info popups
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive**: Works on all screen sizes
- ⚙️ **Configurable**: Auto-close duration, positioning, custom titles
- 🔄 **Reusable**: Easy to integrate anywhere in your application
- 🎯 **Service-based**: Simple API for showing/hiding popups
- 📦 **Standalone**: No external dependencies

## Demo

Run the project to see all popup types in action:

```bash
npm start
```

## Installation & Setup

1. Copy the popup components to your project:

   ```
   src/app/shared/popup-message/
   ├── popup-message.component.ts
   ├── popup-message.component.html
   ├── popup-message.component.scss
   ├── popup-container.component.ts
   ├── popup.service.ts
   └── index.ts
   ```

2. Add the `PopupContainerComponent` to your root component template:
   ```html
   <!-- Add this to your app.component.html -->
   <app-popup-container position="top-right"></app-popup-container>
   ```

## Usage Examples

### Basic Usage

```typescript
import { Component } from "@angular/core";
import { PopupService } from "./shared/popup-message";

@Component({
  selector: "app-example",
  template: `
    <button (click)="showSuccess()">Success</button>
    <button (click)="showError()">Error</button>
  `,
})
export class ExampleComponent {
  constructor(private popupService: PopupService) {}

  showSuccess() {
    this.popupService.success("Operation completed successfully!");
  }

  showError() {
    this.popupService.error("Something went wrong!");
  }
}
```

### Advanced Usage

```typescript
// Show popup with custom title and duration
this.popupService.success(
  "Your profile has been updated successfully!",
  "Profile Updated",
  3000 // 3 seconds
);

// Show error that doesn't auto-close
this.popupService.error(
  "Please fix the validation errors before submitting.",
  "Validation Error",
  0 // No auto-close
);

// Show custom popup with all options
this.popupService.show("This is a custom message", "info", {
  title: "Custom Title",
  duration: 10000, // 10 seconds
  showCloseButton: true,
});
```

## API Reference

### PopupService Methods

| Method                                | Parameters                                               | Description                                 |
| ------------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| `success(message, title?, duration?)` | message: string, title?: string, duration?: number       | Show success popup                          |
| `error(message, title?, duration?)`   | message: string, title?: string, duration?: number       | Show error popup (no auto-close by default) |
| `warning(message, title?, duration?)` | message: string, title?: string, duration?: number       | Show warning popup                          |
| `info(message, title?, duration?)`    | message: string, title?: string, duration?: number       | Show info popup                             |
| `show(message, type, options?)`       | message: string, type: PopupType, options?: PopupOptions | Show custom popup                           |
| `close(id)`                           | id: string                                               | Close specific popup                        |
| `closeAll()`                          | -                                                        | Close all popups                            |

### PopupMessage Interface

```typescript
interface PopupMessage {
  id?: string;
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number; // milliseconds (0 = no auto-close)
  showCloseButton?: boolean;
}
```

### Positioning Options

Available positions for `PopupContainerComponent`:

- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`
- `center`

```html
<app-popup-container position="bottom-left"></app-popup-container>
```

## Customization

### Colors & Styling

Edit the SCSS variables in `popup-message.component.scss`:

```scss
// Success color
&.popup-success {
  border-left-color: #10b981; // Change this
}

// Error color
&.popup-error {
  border-left-color: #ef4444; // Change this
}
```

### Animation Duration

Modify the transition duration in the component:

```scss
.popup-overlay {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // Change duration here
}
```

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `ng build` to build the project.

### Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## License

MIT License - feel free to use in your projects!
