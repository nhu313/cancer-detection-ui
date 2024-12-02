import { Component } from '@angular/core';
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, UploadDataWithPathInput } from "aws-amplify/storage";
import type { Schema } from "../../../amplify/data/resource";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';


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

  constructor(private http: HttpClient) {}

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

        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.statusText;
          console.log(error);
        },
      });
    }
  }


}
