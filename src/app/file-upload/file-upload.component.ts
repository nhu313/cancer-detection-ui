import { Component } from '@angular/core';
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';

const client = generateClient<Schema>();

import { getCurrentUser } from 'aws-amplify/auth';
import { ImageResultComponent } from '../image-result/image-result.component';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ImageResultComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  errorMessage = '';
  file: File | null = null; // Variable to store file
  result: any | null = null;

  constructor(private http: HttpClient) { }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append('file', this.file, this.file.name);

      this.http.post(environment.api_url + "/api/process_image", formData).subscribe({
        next: (result) => {
          this.result = result;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.statusText;
          console.log(error);
        },
      });
    }
  }

  // displayResult(result: any) {
  //   console.log(typeof this.userId);
  //   console.log(client.models);
  //   try {
  //     // client.models.ImageResult.create({
  //     //   // userId: this.userId,
  //     //   filePath: result.filePath,
  //     //   fileName: result.fileName,
  //     //   category: result.category,
  //     // });
  //     // // redirect
  //   } catch (error) {
  //     console.error('error saving result', error);
  //   }
  // }
}
