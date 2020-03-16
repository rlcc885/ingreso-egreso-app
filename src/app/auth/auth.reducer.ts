import * as fromAuth from './auth.actions';
import { User } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';

export interface State {
     user: User
};

const initialState: State = {
    user: null,
};

export const _authReducer = createReducer( initialState,
  on(fromAuth.setUser, (state, {user}) => ( {...state, user: {...user} } )),
  on(fromAuth.unSetUser, (state) => ( {...state, user: null } )),
);

export function authReducer( state, action) {
  return _authReducer(state, action);
}
