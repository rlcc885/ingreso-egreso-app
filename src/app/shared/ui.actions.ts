// import { Action } from '@ngrx/store';

// export const ACTIVAR_LOADING = '[UI Loading] ACTIVAR_LOADING';
// export const DESACTIVAR_LOADING = '[UI Loading] DESACTIVAR_LOADING';

// export class ActivarLoadingAction implements Action {
//   readonly type = ACTIVAR_LOADING;
// }

// export class DesactivarLoadingAction implements Action {
//   readonly type = DESACTIVAR_LOADING;
// }

// export type acciones = ActivarLoadingAction | DesactivarLoadingAction;

import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] Is Loading');
export const stopLoading = createAction('[UI Component] Stop Loading');
