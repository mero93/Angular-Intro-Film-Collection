import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';
import { ElementRef } from '@angular/core';

describe('AutofocusDirective', () => {
  it('should focus the input element on initialization', () => {
    const inputElement = document.createElement('input');
    document.body.append(inputElement);

    const inputRef = new ElementRef(inputElement);

    TestBed.configureTestingModule({
      providers: [AutofocusDirective, { provide: ElementRef, useValue: inputRef }],
    });

    const directive = TestBed.inject(AutofocusDirective);

    directive.ngAfterViewInit();

    expect(inputRef).toBeTruthy();
    expect(document.activeElement).toBe(inputElement);

    inputElement.remove();
  });
});
