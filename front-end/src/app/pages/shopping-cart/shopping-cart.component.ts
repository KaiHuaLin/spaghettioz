import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DbService } from 'src/app/service/db/db.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartFormGroup: FormGroup;
  listItems = [];

  constructor(private snackBar: MatSnackBar, private AuthService: AuthService, private Db: DbService) { 
    this.shoppingCartFormGroup = new FormGroup(
      {
        listItem: new FormControl(""),
      },
      Validators.required
    );
    this.getShoppingCart();
  }

  ngOnInit(): void {
  }

   //adds item to list
   async addToList(listItem){
    this.listItems.push(listItem);
    
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
  
    await this.Db.update_user(currentUser.uid, {shoppingCart:this.listItems});
    this.shoppingCartFormGroup.reset();
  }

  async deleteFromList(index){
    this.listItems.splice(index, 1);
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    this.Db.update_user(currentUser.uid, {shoppingCart:this.listItems});
    this.snackBar.open("Ingredient sucessfully deleted from list.", null, { duration: 4000});
  }

  print(){
    window.print();
  }

  async getShoppingCart() {
    const currentUser = await this.AuthService.getCurrentUser();
    const dbUser = await this.Db.get_user(currentUser.uid);
    if(dbUser.shoppingCart){
      dbUser.shoppingCart.forEach(async element =>{
        this.listItems.push(element);
      });
    }
    
  }
}
