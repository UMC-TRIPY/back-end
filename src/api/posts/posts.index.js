const router = require("express").Router();
const postController = require("./posts.controller");

router.get("/", postController.getPosts);

module.exports = router;
