import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WaitscreenComponent } from './waitscreen/waitscreen.component';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  declarations: [AppComponent, HelloComponent, WaitscreenComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
