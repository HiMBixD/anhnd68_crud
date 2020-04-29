import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {createUser, loadUser, selectUser, updateUser, UserState} from '../../store';
import {User} from '../../models/user.model';

@Component({
  selector: 'fis-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private unsubcribe$ = new Subject<void>();
  checkExist: boolean;
  title: any;
  user$: Observable<User>;


  userForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    userName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userStore: Store<UserState>
    ) { }

  ngOnInit(): void {
    const id =  this.route.snapshot.paramMap.get('userId');

    if (id) {
      this.checkExist = true;
      // @ts-ignore
      this.userStore.dispatch(loadUser({id}));
      this.user$ = this.userStore.pipe(select(selectUser));
      this.title = 'Thông Tin Người Dùng';
      this.user$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if (res) {
          this.userForm.patchValue(res);
        }
      });
    } else {
      this.checkExist = false;
      this.title = 'Thêm Thông Tin Người Dùng';
    }
  }

  onCreate(form: FormGroup){
    const {value} = form;
    this.userStore.dispatch(createUser({user: value}));
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch((updateUser({user: value})));
  }
  onSave(form: FormGroup) {
    if (this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
