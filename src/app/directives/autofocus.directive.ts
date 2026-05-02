import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  private readonly input = inject<ElementRef<HTMLInputElement>>(ElementRef);

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }
}
