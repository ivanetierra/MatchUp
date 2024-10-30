import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { FileUploaderComponent } from "../../../../shared/components/file-uploader/file-uploader.component"


@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FileUploaderComponent],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

  }
}
