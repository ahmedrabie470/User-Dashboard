import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserCardComponent } from '../user-card/user-card.component';
import { selectLoading, selectUsers } from '../user/state/user.selectors';
import { loadUsers } from '../user/state/user.actions';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <mat-progress-bar *ngIf="loading$ | async" mode="indeterminate"></mat-progress-bar>
      <div *ngFor="let user of users$ | async" class="user-item">
        <app-user-card [user]="user"></app-user-card>
      </div>
      <mat-paginator (page)="onPageChange($event)"></mat-paginator>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatProgressBarModule, UserCardComponent],
})
export class UserListComponent {
  users$: Observable<any[]> = this.store.pipe(select(selectUsers));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(private store: Store) {
    this.store.dispatch(loadUsers({ page: 1 }));
  }

  onPageChange(event: any) {
    this.store.dispatch(loadUsers({ page: event.pageIndex + 1 }));
  }
}
