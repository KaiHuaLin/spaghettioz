
# Functions

## APIs

### User API


1. Get user:
    * GET Request
    * `Host url`/api/users/`request type`/`value`
    * Ex: api/users/email/test@test.com
    * **Note: request type can be: uid, email**

2. Login user:
    * POST Request
    * `Host url`/api/users/login
    * Ex: api/users/login
    * json object: {email: "test@test.com", password: "qwe123"}
    


3. Create user:
     * POST request
     * `Host url`/api/users/ with json object
     * Ex: /api/users/ 
     * json object: {email: "test@test.com", password: "qwe123"}
     * **Note: json object can include: uid, email, emailVerified, phoneNumber, password,** **displayName, photoURL, disabled**


4. Update user:
    * PUT request
    * `Host url`/api/users/uid with json object
    * Ex: /api/users/YfivdoR07GPJ5Pjv
    * json object: {email: "testUpdate@test.com", password: "123456eref",displayName: "testUser"}
    * **Note: json object can include: uid, email, emailVerified, phoneNumber, password,** **displayName, photoURL, disabled**



### Recipe API

1. Get recipe by ID:
    * GET Request
    * `Host url`/api/recipes/`id`
    * Ex: api/recipes/76985

2. Get recipes by query:
    * GET Request
    * `Host url`/api/recipes?`query parametor`
    * EX: api/recipes?includeIngredients=tomato.cheese&number=10
    * Please reference this page to see all the parametors: 
    * https://spoonacular.com/food-api/docs#Search-Recipes-Complex