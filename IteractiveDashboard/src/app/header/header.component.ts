import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>User Dashboard</h1>
      <input matInput placeholder="Search by ID" [(ngModel)]="searchTerm" (input)="searchUser()">
    </header>
  `,
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule],
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  searchUser() {
    if (this.searchTerm) {
      this.router.navigate(['/user', this.searchTerm]);
    }
  }
}
