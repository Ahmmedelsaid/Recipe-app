import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredients } from '../inredients.model';
import { shoppingService } from '../shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent implements OnInit {
  Ingredients!: ingredients[];
  private igChangedSub!: Subscription;
  constructor(private shopservice: shoppingService) {}
  ngOnInit() {
    this.Ingredients = this.shopservice.getIngredients();
    this.igChangedSub = this.shopservice.ingredo.subscribe(
      (ingredi: ingredients[]) => {
        this.Ingredients = ingredi;
      }
    );
  }
  OnDestroy() {
    this.igChangedSub.unsubscribe();
  }
  onEdit(index: number) {
    this.shopservice.startedEdit.next(index);
  }
}
