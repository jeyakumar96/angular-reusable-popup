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

1. Add the `PopupContainerComponent` to your root component template:

```html
<!-- Add this to your app.component.html -->
<app-popup-container [position]="'top-right'"></app-popup-container>
```

2. Use the `PopupService` to show messages:

```ts
import { Component, inject } from "@angular/core";
import { PopupService } from "./shared/popup-message/popup.service";

@Component({
  selector: "app-example",
  template: `
    <button (click)="success()">Success</button>
    <button (click)="error()">Error</button>
    <button (click)="info()">Info</button>
    <button (click)="warning()">Warning</button>
  `,
  standalone: true,
})
export class ExampleComponent {
  private popup = inject(PopupService);

  success() {
    this.popup.success("Operation completed successfully!", "Success", 3000);
  }
  error() {
    this.popup.error("Something went wrong", "Error");
  }
  info() {
    this.popup.info("Heads up: new feature", "Info", 5000);
  }
  warning() {
    this.popup.warning("Please check your input", "Warning", 4000);
  }
}
```

3. Optional: Custom SVG icons

```ts
this.popup.show("Custom icon message", "info", {
  title: "Custom",
  iconType: "svg",
  customIcon: "assets/icons/info.svg",
  duration: 5000,
  showCloseButton: true,
});
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

Common layout styles live in `src/app/shared/popup-message/_popup-common.scss` and are consumed in each variant’s SCSS:

```scss
// Example: success variant SCSS
@use "../../popup-message/popup-common" as *;

.popup-container {
  background: #caf1d8;
  border-left: 6px solid #1ca750;
}
```

### Animation Duration

Modify animation/transition in the shared partial:

```scss
.popup-overlay {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // Change duration here
}

## Component Structure


- Shared styles: `src/app/shared/popup-message/_popup-common.scss`
- Variants (standalone):
  - `src/app/shared/components/popup-success-component/popup-success.component.ts`
  - `src/app/shared/components/popup-error-component/popup-error.component.ts`
  - `src/app/shared/components/popup-info-component/popup-info.component.ts`
  - `src/app/shared/components/popup-warning-component/popup-warning.component.ts`
- Container: `src/app/shared/popup-message/popup-container.component.ts`
- Types: `src/app/shared/popup-message/popup.types.ts`
- Service: `src/app/shared/popup-message/popup.service.ts`

The container subscribes to the stream from `PopupService` and renders the appropriate variant component based on `popup.type`.
```
