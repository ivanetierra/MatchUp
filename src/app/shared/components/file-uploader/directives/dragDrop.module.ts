import { NgModule } from '@angular/core';
import { DragDirective } from './dragDrop.directive';

const components = [DragDirective];

@NgModule({
  declarations: [...components],
  providers: [],
  exports: [...components]
})
export class DragDirectiveModule {}
