import { Directive, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
declare var $: any; // Declare $ to use jQuery

@Directive({
  selector: '[maxlength]'
})
export class MaxlengthDirective implements OnChanges, OnDestroy {
  @Input() maxlength: number | string = 5;
  @Input() options: any; // Optional: for passing bootstrap-maxlength options

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.maxlength) {
      // Destroy previous instance if it exists
      if ($(this.el.nativeElement).data('maxlength')) {
        $(this.el.nativeElement).maxlength('destroy');
      }

      // Initialize bootstrap-maxlength
      $(this.el.nativeElement).maxlength({
        alwaysShow: false,
        threshold: 10, // Example threshold
        warningClass: 'badge badge-warning',
        limitReachedClass: 'badge badge-danger',
        separator: '/',
        preText: '',
        postText: '',
        validate: true,
        placement: 'centered-right',
        ...this.options // Merge with any provided options
      });
    }
  }

  ngOnDestroy() {
    // Destroy the plugin instance when the directive is destroyed
    if ($(this.el.nativeElement).data('maxlength')) {
      $(this.el.nativeElement).maxlength('destroy');
    }
  }
}