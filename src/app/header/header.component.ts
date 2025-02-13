import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HoverColorDirective } from '../directives/hover-color.directive';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, HoverColorDirective,CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {

  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);

  today: Date = new Date();

  title = 'mentoring-first-project';

  readonly headerItem1 ="Главная"

  readonly headerItem2 ="О компании"

  readonly headerItem3 ="Каталог"

  isShowCatalog=true;

  public aboutCompany = getMenuName("О компании");

  public isUpperCase: boolean = true;

  public menuItems =['Главная','О компании','Каталог']

  public upperCaseMenuItems = this.menuItems.map((item) => {
    return item.toUpperCase();
  });
  
  changeMenuText() {
    this.menuItems = this.upperCaseMenuItems.map((item: string) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
  
    this.isUpperCase = !this.isUpperCase;
  }


  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: "300px",
      height: "150px"
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin()
      } else if (result === 'user') {
        this.userService.loginAsUser()
      } else return undefined;
    });

}


public logout() {
  if(confirm('Вы точно хотите выйти?')) {
    return this.userService.logout()
  }
   else return false;
 }
}

function getMenuName(name: string): string {
  return name;
}
