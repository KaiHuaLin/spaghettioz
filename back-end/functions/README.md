
# Functions

## APIs

### User API


1. Get user:
    * GET Request
    * <Host url>/api/users/<request type>/<value>
    * Ex: api/users/email/test@test.com
    * **Note: request type can be: uid, email**


2. Create user:
     * POST request
     * <Host url>/api/users/ with json object
     * Ex: /api/users/ 
     * json object: {email: "test@test.com", password: "qwe123"}
     * **Note: json object can include: uid, email, emailVerified, phoneNumber, password,** **displayName, photoURL, disabled**


3. Update user:
    * PUT request
    * <Host url>/api/users/uid with json object
    * Ex: /api/users/YfivdoR07GPJ5Pjv
    * json object: {email: "testUpdate@test.com", password: "123456eref",displayName: "testUser"}
    * **Note: json object can include: uid, email, emailVerified, phoneNumber, password,** **displayName, photoURL, disabled**