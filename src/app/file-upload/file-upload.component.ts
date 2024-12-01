import { Component } from '@angular/core';
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, UploadDataWithPathInput } from "aws-amplify/storage";
import type { Schema } from "../../../amplify/data/resource";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  userFile = null;
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
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
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append('file', this.file, this.file.name);

      const upload$ = this.http.post("http://localhost:5000/api/process_image", formData);

      this.status = 'uploading';

      upload$.subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (error: any) => {
          this.status = 'fail';
          console.log(error);
        },
      });
    }
  }


}
