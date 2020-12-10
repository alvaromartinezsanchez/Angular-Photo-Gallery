import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from '../../services/photo.service'

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private photoService: PhotoService
    ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id).subscribe(
        res => {
          this.photo = res;
        },
        err => console.log(err)
        
        
      );
    })
  }

  deletePhoto(id){
    this.photoService.deletePhoto(id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/photos']);
      },
      err => console.log(err)
      
    );
    
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean{
    console.log(title, description);
    
    this.photoService.updatePhoto(this.id, title.value, description.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    return false;
  }

}
