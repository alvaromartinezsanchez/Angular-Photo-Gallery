import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/Photo'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, photo: File){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post('/api/photos', fd);
  }

  getPhotos(){
    return this.http.get<Photo[]>('/api/photos');
  }

  getPhoto(id: string){
    return this.http.get<Photo>('/api/photos/' + id);
  }

  deletePhoto(id: string){
    return this.http.delete('api/photos/' + id);
  }

  updatePhoto(id: string, title: string, description: string){
    return this.http.put('/api/photos/' + id, {title, description});
  }
}
