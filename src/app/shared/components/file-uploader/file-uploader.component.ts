import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DragDirectiveModule } from './directives/dragDrop.module';
import { FileHandle } from './interfaces';
import { FileUploadService } from './services/file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DragDirectiveModule]
})
export class FileUploaderComponent {
  percentage = 0;
  currentFile: File;

  @Input() currentImageUrl;
  @Input() fileName;
  @Input() directory = '';

  constructor(
    private uploadService: FileUploadService,
    private _cdr: ChangeDetectorRef
  ) {}

  openFileExplorer(): void {
    document.getElementById('dropzone-file')?.click();
  }

  selectFile(event: any): void {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);
      this.addToPreview(file);
    }
  }

  filesDropped(files: FileHandle[]): void {
    this.addToPreview(files?.[0].file);
  }

  addToPreview(file: File): void {
    this.currentFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.currentImageUrl = e.target.result;
      this._cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  upload(customFileName): Observable<string> {
    const file = this.currentFile;
    const fileName = customFileName || this.fileName;

    if (file) {
      if (file.size > 3 * Math.pow(10, 6)) {
        console.log('error image to big');
      } else {
        const currentFileUpload = { file };
        const uploadDirectory = this.directory;
        return this.uploadService.uploadFileToStorage(uploadDirectory, currentFileUpload, fileName);
      }
    } else {
      if (this.currentImageUrl) {
        //Image already uploaded return url
        return of(this.currentImageUrl);
      } else {
        //Delete image from storage as no file and no url implies delete
        return this.uploadService.deleteFileStorage(this.directory + '/' + this.fileName).pipe(map(() => ''));
      }
    }
  }

  deleteImage(): void {
    this.currentImageUrl = '';
    this.currentFile = undefined;
    event.preventDefault();
  }
}
