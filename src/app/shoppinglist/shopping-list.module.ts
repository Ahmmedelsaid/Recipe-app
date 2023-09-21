import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppinglistComponent } from './shoppinglist.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingRouting } from './shopping-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppinglistComponent],
  imports: [FormsModule, SharedModule, RouterModule, ShoppingRouting],
})
export class ShoppingListModule {}
