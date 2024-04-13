import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Movie } from "../models/Movie";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  collectionName = "Movies"

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  loadMovieMeta(): Observable<Array<Movie>> {
    return this.afs.collection<Movie>(this.collectionName).valueChanges();
  }

  loadImage(image_url: string){
    return this.storage.ref(image_url).getDownloadURL();
  }
}
