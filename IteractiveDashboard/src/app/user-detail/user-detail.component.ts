import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { selectLoading, selectUser, selectFilteredUsers } from '../user/state/user.selectors'; // Assuming you have implemented these selectors and actions
import { loadUser, setSearchQuery } from '../user/state/user.actions';

@Component({
  selector: 'app-user-detail',
  template: `
   <div *ngIf="loading$ | async" class="loading-bar">
  <mat-progress-bar mode="indeterminate"></mat-progress-bar>
</div>
<div *ngIf="user$ | async as user">
  <div>
    <img [src]="user.avatar" alt="Avatar">
    <p>{{ user.first_name }} {{ user.last_name }}</p>
    <button (click)="goBack()">Back</button>
  </div>
</div>
    <!-- Display filtered user list -->
    <div *ngFor="let user of filteredUsers$ | async">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<any> = this.store.pipe(select(selectUser));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));
  filteredUsers$: Observable<any[]> = of([]); // Initialize with an empty array
  searchQuery: string = ''; // Property to store search query

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Check if the route parameter exists
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // If route parameter exists, load user details and initialize filteredUsers$ with empty array
      const id = +idParam;
      this.store.dispatch(loadUser({ id }));
      this.filteredUsers$ = of([]);
    } else {
      // If route parameter does not exist, initialize filteredUsers$ with selectFilteredUsers selector
      this.filteredUsers$ = this.store.pipe(select(selectFilteredUsers));
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  filterUsers() {
    // Dispatch action to update search query in store
    this.store.dispatch(setSearchQuery({ searchQuery: this.searchQuery }));
  }
}
