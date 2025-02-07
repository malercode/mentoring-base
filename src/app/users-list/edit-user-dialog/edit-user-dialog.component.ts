import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { User } from "../users-list.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-edid-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],

    standalone: true,
    imports: [ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule
    ]
})

export class EditUserDialogComponent{
    
    readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
    

    public form = new FormGroup({
        id: new FormControl(this.data.user.id),
        name: new FormControl(this.data.user.name, { validators: [Validators.required]}),
        email: new FormControl(this.data.user.email, { validators: [Validators.required, Validators.email]}),
        website: new FormControl(this.data.user.website, { validators: [Validators.required]}),
        company: new FormGroup({
            name: new FormControl(this.data.user.company.name, { validators: [Validators.required]}),
        })
    });

    submitForm(){
        this.dialogRef.close(this.form.value);
    }
}