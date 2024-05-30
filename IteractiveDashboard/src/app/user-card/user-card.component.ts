import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card" (click)="navigateToUserDetail(user.id)">
      <img [src]="user.avatar" alt="Avatar">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
  `,
  styleUrls: ['./user-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UserCardComponent {
  @Input() user: any;

  constructor(private router: Router) {}

  navigateToUserDetail(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
