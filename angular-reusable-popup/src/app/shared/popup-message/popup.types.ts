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
