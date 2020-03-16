import * as fromUI from './ui.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export const _uiReducer = createReducer( initState,
  on( fromUI.isLoading, state => ( {...state, isLoading: true})),
  on( fromUI.stopLoading, state => ( {...state, isLoading: false})),
);

export function uiReducer( state, action) {
  return _uiReducer( state, action);
}
