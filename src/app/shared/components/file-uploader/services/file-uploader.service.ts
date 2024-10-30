import { Injectable } from '@angular/core';
import { deleteObject, ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes, UploadResult } from 'firebase/storage';
import { from, Observable, switchMap } from 'rxjs';
import { FileUpload } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '';

  constructor(private storage: Storage) {}

  // 'file' comes from the Blob or File API
  uploadFileToStorage(directory: string, fileUpload: FileUpload, name: string): Observable<string> {
    const filePath = `${this.basePath}/${directory}/${name}`;
    const storageRef = ref(this.storage, filePath);
    return from(uploadBytes(storageRef, fileUpload.file)).pipe(
      switchMap((uploadResult: UploadResult) => {
        return from(getDownloadURL(uploadResult.ref));
      })
    );
  }

  deleteFileStorage(path: string): Observable<void> {
    const deleteRef = ref(this.storage, this.basePath + path);
    return from(deleteObject(deleteRef));
  }
}
