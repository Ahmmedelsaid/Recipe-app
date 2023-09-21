import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredients } from 'src/app/inredients.model';
import { shoppingService } from 'src/app/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') addForm!: NgForm;
  subcription!: Subscription;
  editMode = false;
  editIndex!: number;
  editedItem!: ingredients;
  constructor(private slService: shoppingService) {}
  onSubmit() {
    const value = this.addForm.value;
    const newIngredient = new ingredients(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngerdient(this.editIndex, newIngredient);
    } else {
      this.slService.adIngredient(newIngredient);
    }
    this.editMode = false;
    this.addForm.reset();
  }
  ngOnInit(): void {
    this.subcription = this.slService.startedEdit.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.addForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
  onReset() {
    this.addForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  onRemove() {
    this.slService.deleteIngredient(this.editIndex);
    this.onReset();
  }
}
