import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * A service to send notifications to the user.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Injects dependencies to the service.
   * @param toastr A service for customizing and styling notifications.
   */
  constructor(private toastr: ToastrService) { }

  /**
   * Diplays a successful notification.
   * @param message The body of the notification.
   * @param title The title of the notification. 
   */
  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

    /**
   * Diplays an error notification.
   * @param message The body of the notification.
   * @param title The title of the notification. 
   */
  showError(messages: string, title: string = "") {
    this.toastr.error(messages, title);
    
  }

  /**
   * Diplays an informative notification.
   * @param message The body of the notification.
   * @param title The title of the notification. 
   */
  showInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }

  /**
   * Diplays a warning notification.
   * @param message The body of the notification.
   * @param title The title of the notification. 
   */
  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
