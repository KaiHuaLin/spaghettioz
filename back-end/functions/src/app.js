const express = require("express");

const router = new express.Router();

const recipeRouter = require("./routes/recipe");
const userRouter = require("./routes/user");

router.use("/recipes", recipeRouter);
router.use("/users", userRouter);


router.route("/").get((req, res) => {
    return res.status(200).send("hello world from api index");
});

module.exports = router;
