import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverColor]',
  standalone: true
})

export class HoverColorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.changeColor('#f0a830');
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.changeColor(null);
  }

  private changeColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}