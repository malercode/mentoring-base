import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomDatePipe } from '../pipes/custom-date.pipe';
import { HoverColorDirective } from '../directives/hover-color.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, CustomDatePipe, HoverColorDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {

  currentDate: Date = new Date();

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

}

function getMenuName(name: string): string {
  return name;
}
