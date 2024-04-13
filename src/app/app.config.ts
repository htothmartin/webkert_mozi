import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { firebaseConfig } from '../firebase.config';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';


export const appConfig: ApplicationConfig = {
  providers: [
    //importProvidersFrom(
    //  provideFirebaseApp(() => initializeApp(firebaseConfig)),
   //   provideAuth(() => getAuth()),
    //  provideFirestore(() => getFirestore()),
    //  provideStorage(() => getStorage()),

    //)
  ]
};
