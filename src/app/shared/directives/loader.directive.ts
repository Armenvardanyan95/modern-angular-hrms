import { Directive, OnInit, DoCheck, OnChanges, inject, TemplateRef, ViewContainerRef, Input, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { LoaderComponent } from '../components/loader.component';

@Directive({
  selector: '[loading]',
  standalone: true,
})
export class LoaderDirective implements OnInit, DoCheck, OnChanges {
  private readonly templateRef = inject(TemplateRef);
  private readonly vcRef = inject(ViewContainerRef);
  @Input() loading = false;
  templateView!: EmbeddedViewRef<any>;
  loaderRef!: ComponentRef<LoaderComponent>;

  ngOnInit() {
    this.templateView = this.templateRef.createEmbeddedView({});
    this.loaderRef = this.vcRef.createComponent(LoaderComponent, {
      injector: this.vcRef.injector,
      projectableNodes: [this.templateView.rootNodes],
    });

    this.loaderRef.setInput('loading', this.loading);
  }

  ngOnChanges() {
    this.loaderRef?.setInput('loading', this.loading);
  }

  ngDoCheck() {
    this.templateView?.detectChanges();
  }
}
