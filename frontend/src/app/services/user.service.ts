import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string = '';

  private userPermission: boolean = false;

  private adminPermission: boolean = false;

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  checkPermision(username: string): void {
    this.userPermission = false;
    this.adminPermission = false;
    if (username && username.length > 0) {
      const firstLetter = username.charAt(0).toLowerCase();
      if (firstLetter === 'u') {
        this.userPermission = true;
      } else if (firstLetter === 'a') {
        this.adminPermission = true;
      }
    }
  }
}
