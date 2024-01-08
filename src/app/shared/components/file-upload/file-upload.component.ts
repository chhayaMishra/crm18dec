import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;
  public file: File | null = null;
  filename: string;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private toast: ToastrService,
  ) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = "";
    this.file = null;
  }
  fileSelect(event) {
    if (event[0].type.match("image.*")) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(event[0].type)) {
        this.toast.error("Invalid file type. Please upload in proper formate.");
        // alert("Invalid file type. Please upload in proper formate.");
        event.target.value = "";
      }
      this.filename = event[0].name;
    }
    if (event[0].type.match("video.*")) {
      const validImageTypes = ["video/mpeg", "video/mp4"];
      if (!validImageTypes.includes(event[0].type)) {
        this.toast.error("Invalid file type. Please upload in proper formate.");
        // alert("Invalid file type. Please upload in proper formate.");
        event.target.value = "";
      }
      this.filename = event[0].name;
    }
    if (event[0].type.match("application/*")) {
      const validImageTypes = [
        "application/pdf",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.ms-excel",
      ];

      if (!validImageTypes.includes(event[0].type)) {
        this.toast.error("Invalid file type. Please upload in proper formate.");
        // alert("Invalid file type. Please upload in proper formate.");
        event.target.value = "";
      }
      this.filename = event[0].name;
    } else if (
      !event[0].type.match("image.*") &&
      !event[0].type.match("application/*") &&
      !event[0].type.match("application/*")
    ) {
      this.toast.error("Invalid file type. Please upload in proper formate.");
    }
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
