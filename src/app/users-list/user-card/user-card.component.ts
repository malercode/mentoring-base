import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { RemoveDashesPipe } from "../../pipes/remove-dashes.pipe";
import { HoverShadowDirective } from "../../directives/hover-shadow.directive";
import { HoverColorDirective } from "../../directives/hover-color.directive";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: true,
    imports: [RemoveDashesPipe, HoverShadowDirective, HoverColorDirective, MatIconModule, MatButtonModule]
})

export class UserCardComponent {
    @Input()
    user!: User;

    @Output()
    deleteUser = new EventEmitter<number>();

    @Output()
    editUser = new EventEmitter();

    readonly dialog = inject(MatDialog);

    openDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: {user: this.user},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.editUser.emit(result)
          }  
        });
      }

      openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: { id: this.user.id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteUser.emit(result);
          }
        });
      }
}