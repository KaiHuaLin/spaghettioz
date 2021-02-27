
# SERVICES

Please add try catch block around every method that is being called.

### Auth service (user api)
**Use this when you are operating users in firebase auth**

1. Sign in:
    * **use async/await**
    * `signIn(email: string, password: string)`
    * return type: user object
    * Ex: `signIn("test@test.com", "test1234")`

2. Create user:
    * **use async/await**
    * `create_user(email: string, password: string, displayName: string)`
    * return type: `firebase.User`
    * Ex: `create_user("test@test.com", "test1234", "testUser")`

3. Update user:
    * **use async/await**
    * `update_user(user: firebase.User, updateInfo: object)`
    * return type: none
    * EX: `update_user(<firebase user>, {displayName: "testUser"})`

4. Get current user:
    * **use async/await**
    * `getCurrentUser()`
    * return type: `firebase.User`
    * EX: `const currentUser = await this.AuthService.getCurrentUser();`


### DB Service (firestore)
**Use this when you are operating users in firebase firestore**

1. Create user:
    * `create_user(uid: string, email: string, password: string)`
    * return type: none
    * Ex: `create_user("dsjcksjnebvvs34v", "test@test.com, "qwer1234)`

2. Update user:
    * **use async/await**
    * `update_user(uid: string, updateInfo: object)`
    * return type: none
    * Ex: `update_user("shbjshcbjh1gwfhgv, {favorite: [1,2,3]})`

3. Get user:
    * **use async/await**
    * `get_user(uid: string)`
    * return type: `User`
    * Ex: `const dbUser = await this.Db.get_user(currentUser.uid);`


### Recipe API

1. Get recipe by ID:
    * **use async/await**
    * `get_recipe_by_id(id: string)`
    * return type: recipe object
    * Ex: `get_recipe_by_id("716429")`

2. Get recipes by query:
    * **use async/await**
    * `get_recipe_by_query(query: Query)`
    * EX: `get_recipe_by_query({includeIngredients: "tomato,cheese"})`
    * Please reference this page to see all the parametors: 
    * https://spoonacular.com/food-api/docs#Search-Recipes-Complex