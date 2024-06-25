import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxParallaxModule } from '@yoozly/ngx-parallax';
import { ThreeSceneComponent } from './three-scene/three-scene.component';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParallaxModule,
    ThreeSceneComponent,
  ],
})
export class AppModule {}
