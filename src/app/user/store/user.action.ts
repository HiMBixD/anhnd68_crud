import { createAction, props } from '@ngrx/store';
import {User} from '../models/user.model';


/**************  Load users ***************/
export const loadUsersList = createAction(
  '[Users List Page] Load Users List'
);

export const loadUsersListSuccess = createAction(
  '[Users List API] Load Users List Success',
  props<{ users: User[] }>()
);

export const loadUsersListFailed = createAction(
  '[Users List API] Load Users List Failed',
  props<{ errors: any }>()
);
/**************  End: Load users ***************/

/**************  Load user ***************/
export const loadUser = createAction(
  '[Users Page] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[Users API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailed = createAction(
  '[Users API] Load User Failed',
  props<{ errors: any }>()
);
/**************  End: Load user ***************/

/**************  Create user ***************/
export const createUser = createAction(
  '[CreateUser Page] Create User',
  props<{user: User}>()
);

export const createUserSuccess = createAction(
  '[Users API] Create User Success',
  props<{ user: User }>()
);

export const createUserFailed = createAction(
  '[Users API] Create User Failed',
  props<{ errors: any }>()
);
/**************  End: Create user ***************/

/**************  Update user ***************/
export const updateUser = createAction(
  '[UpdateUser Page] Update User',
  props<{user: User}>()
);

export const updateUserSuccess = createAction(
  '[Users API] Update User Success',
  props<{ user: User}>()
);

export const updateUserFailed = createAction(
  '[Users API] Update User Failed',
  props<{ errors: any }>()
);
/**************  End: Update user ***************/
