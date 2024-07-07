import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule, 
      BrowserAnimationsModule,
      NgxSpinnerModule,
      SweetAlert2Module,
      ToastrModule.forRoot({
        closeButton:true,
        progressBar:true
      }),
      CommonModule, 
      RouterModule.forRoot(routes)
    ),
  ],
}).catch((err) => console.error(err));
