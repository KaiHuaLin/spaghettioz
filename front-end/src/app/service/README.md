
# SERVICES

Please add try catch block around every method that is being called.

### Auth service (user api)


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