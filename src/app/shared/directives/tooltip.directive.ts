import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'appTooltip',
  standalone: true,
})
export class TooltipDirective {
  @HostBinding('title') @Input() tooltip!: string;
}
