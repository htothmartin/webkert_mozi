import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Movie } from '../models/Movie';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  collectionName = 'Movies';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  loadMoviesMeta(
    searchTerm: string,
    sortAscending: boolean
  ): Observable<Array<Movie>> {
    //return this.afs.collection<Movie>(this.collectionName).valueChanges();

    if (sortAscending && searchTerm == '') {
      return this.afs
        .collection<Movie>(this.collectionName, (ref) =>
          ref.orderBy('title', 'asc')
        )
        .valueChanges();
    } else {
      return this.afs
        .collection<Movie>(this.collectionName, (ref) => {
          return ref.where(
            'title_words',
            'array-contains',
            searchTerm.toLowerCase()
          );
        })
        .valueChanges();
    }
  }

  async loadMovieMeta(id: string): Promise<Movie | undefined> {
    return await firstValueFrom(
      this.afs
        .collection<Movie>(this.collectionName)
        .doc<Movie>(id)
        .valueChanges()
    );
  }

  loadImage(image_url: string) {
    return this.storage.ref(image_url).getDownloadURL();
  }
}
