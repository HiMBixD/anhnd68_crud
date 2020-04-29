import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import {UserState} from '../../store/user.reducer';
import {select, Store} from '@ngrx/store';
import {loadUsersList} from '../../store/user.action';
import {selectUsersList, selectUsersListErrors} from '../../store/user.selector';

@Component({
  selector: 'fis-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList$: Observable<User[]>;
  title = 'Danh Sách Người Dùng';
  errorsList$: Observable<any>;
  constructor(
    private userStore: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.onGetUserList();
    // Get user from store
    this.usersList$ = this.userStore.pipe(select(selectUsersList));
    this.errorsList$ = this.userStore.pipe(select(selectUsersListErrors));
  }

  onGetUserList(){
    this.userStore.dispatch(loadUsersList());
  }

}
