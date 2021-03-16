import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartFormGroup: FormGroup;
  listItems = [];

  constructor(private snackBar: MatSnackBar) { 
    this.shoppingCartFormGroup = new FormGroup(
      {
        listItem: new FormControl(""),
      },
      Validators.required
    );
  }

  ngOnInit(): void {
  }

   //adds item to list
   addToList(listItem){
    this.listItems.push(listItem);
    this.shoppingCartFormGroup.reset();
    console.log(listItem);
    console.log(this.listItems);
  }

  deleteFromList(index){
    this.listItems.splice(index, 1);
    this.snackBar.open("Ingredients sucessfully deleted.", null, { duration: 4000});
  }

  print(){
    window.print();
  }

}
