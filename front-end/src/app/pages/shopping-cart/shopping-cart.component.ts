import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartFormGroup: FormGroup;
  listItems = [];

  constructor() { 
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

}
