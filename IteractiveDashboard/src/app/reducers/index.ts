import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserState, userReducer } from '../user/state/user.reducer';

export interface AppState {
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
