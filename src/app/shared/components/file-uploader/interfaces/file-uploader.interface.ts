import { SafeUrl } from '@angular/platform-browser';
export interface FileUpload {
  name?: string;
  url?: string;
  file: File;
}

export interface FileHandle {
  file: File;
  url: SafeUrl;
}
