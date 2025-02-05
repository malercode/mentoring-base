import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrls: ['./delete-user-dialog.component.scss'],

    standalone: true,
    imports: [MatDialogClose]
})

export class DeleteDialogComponent {
    readonly data = inject<{ id: number }>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
    private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;
  
    submit(): void{
        this.dialogRef.close(this.data.id);
        this.openSnackBar('Пользователь успешно удален!');
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      }
  }