import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ImageResultComponent } from './image-result/image-result.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

export const routes: Routes = [
  { path: 'results/:id', component: ImageResultComponent },
  { path: '**', component: FileUploadComponent },
];
