const express = require("express");

const router = new express.Router();

router.route("/").get((req, res) => {
    // retreive recipes from spoon
    return res.status(200).send("recipes api");
});

module.exports = router;
