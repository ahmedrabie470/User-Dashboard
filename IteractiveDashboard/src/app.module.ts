import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './app/user/state/user.reducer';
import { UserEffects } from './app/user/state/user.effects';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ userState: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  // No need to bootstrap anything here
})
export class AppModule { }
