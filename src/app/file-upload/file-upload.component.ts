import { Component } from '@angular/core';
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, UploadDataWithPathInput } from "aws-amplify/storage";
import type { Schema } from "../../../amplify/data/resource";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';

const client = generateClient<Schema>();

import { getCurrentUser } from 'aws-amplify/auth';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  errorMessage = '';
  file: File | null = null; // Variable to store file
  userId: string = '';


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserId();
  }

  async getUserId() {
    try {
      const { userId } = await getCurrentUser();
      this.userId = userId;
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }

  client() {
    return generateClient<Schema>({
      authMode: "apiKey",
    });
  }

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
          console.log(result);
          this.saveResult(result);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.statusText;
          console.log(error);
        },
      });
    }
  }

  saveResult(result: any) {
    console.log(typeof this.userId);
    console.log(client.models);
    try {
      // client.models.ImageResult.create({
      //   // userId: this.userId,
      //   filePath: result.filePath,
      //   fileName: result.fileName,
      //   category: result.category,
      // });
      // // redirect
    } catch (error) {
      console.error('error saving result', error);
    }
  }
}
