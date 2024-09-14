import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supporting-docs',
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['./supporting-docs.component.scss'],
})
export class SupportingDocsComponent implements OnInit, OnDestroy {
  public addDocForm!: FormGroup;
  public uploading: boolean = false;
  public uploadProgress: number = 0;

  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  private _token: string = '';
  private _userId: string = '';
  private _staycation: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _user: UserService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe((p: ParamMap) => {
      if (p.keys.length > 0) {
        this._token = <string>p.get('token');
        this._userId = <string>p.get('user');
        this._staycation = <string>p.get('staycation');

        this._initForm();
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public onFileSelected(e: any) {
    const files: FileList = e.target.files;
    let imgFiles = [];
    for (let i = 0; i < files.length; i++) {
      imgFiles.push(files[i]);
    }
    this.addDocForm.get('docs')?.setValue(imgFiles);
  }

  public uploadDocs(fg: FormGroup) {
    this.uploading = true;
    console.log(fg.getRawValue());
    let fd: FormData = new FormData();
    let filenames: string[] = [];
    for (let i = 0; i < fg.value.docs.length; i++) {
      filenames.push(this._customFileName(fg.value.docs[i], i));
    }
    fd.append('staycationId', this._staycation);
    fd.append('documents', JSON.stringify(filenames));
    for (let i = 0; i < filenames.length; i++) {
      fd.append('docs', fg.value.docs[i], filenames[i]);
    }
    this._sub.add(
      this._auth.csrfToken()
      .pipe(
        switchMap(x => this._user.uploadSupportDocs(fd, this._userId, this._token, x.token)),
        catchError(e => e)
      )
      .subscribe({
        next: (e: any) => {
          if (typeof e === 'number') {
            this.uploadProgress = e;
          } else {
            if (e !== undefined) {
              this.uploading = false;
            }
          }
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }

  private _initForm() {
    this.addDocForm = this._fb.group({
      docs: new FormControl('', [Validators.required]),
    });
  }

  private _customFileName(file: File, j: number): string {
    let origFileName = file.name;
    let i = origFileName.lastIndexOf('.');
    let format = origFileName.substring(i, origFileName.length);
    return `${this._staycation}-${j}${format}`;
  }
}
