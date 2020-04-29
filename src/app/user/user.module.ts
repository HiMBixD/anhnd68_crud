import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import * as fromPages from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import * as fromComponents from './component';
import {EffectsModule} from '@ngrx/effects';
import {usersReducer} from './store/user.reducer';
import {UsersEffects} from './store/user.effect';
import {UserService} from './services/user.service';

// @ts-ignore
@NgModule({
  declarations: [
    ...fromPages.pages,
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,

    HttpClientModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UserService],
})
export class UserModule { }
