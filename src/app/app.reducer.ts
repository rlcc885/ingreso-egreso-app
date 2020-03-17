import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: fromUI.State,
  auth: fromAuth.State,
  ingresoEgresos: fromIngresoEgreso.State,
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  ingresoEgresos: fromIngresoEgreso.ingresoEgresoReducer,
}
