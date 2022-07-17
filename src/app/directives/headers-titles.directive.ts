import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeadersTitles]'
})
export class HeadersTitlesDirective implements OnInit {

  constructor( private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#EAEAEA');
    this.renderer.setStyle(this.elRef.nativeElement, 'font-size', '20px');
  }

}
