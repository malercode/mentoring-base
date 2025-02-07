import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-create-user-form',
    templateUrl:'./create-user-form.component.html',
    styleUrl: './create-user-form.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule,
        MatButtonModule, 
        MatInputModule, 
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule]
})


export class CreateUserFormComponent {

    readonly dialogRef = inject(MatDialogRef<CreateUserFormComponent>);


    public form = new FormGroup({
        id: new FormControl(new Date().getTime()),
        name: new FormControl('', { validators: [Validators.required]}),
        email: new FormControl('', { validators: [Validators.required, Validators.email]}),
        website: new FormControl('', { validators: [Validators.required]}),
        company: new FormGroup({
            name: new FormControl('', Validators.required),
        })
    });
  

    public submitForm(): void {
        this.dialogRef.close(this.form.value);
        this.form.reset();
    }
}