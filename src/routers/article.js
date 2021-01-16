const express = require("express");

router = new express.Router();

const Article = require("../modules/article");


//post new article to database

router.post("/articles", (req, res) => {
    const article = new Article(req.body);

    article
        .save()
        .then(() => {
            res.status(200).send(article);
            console.log(article);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});


// get the article with title

router.get("/articles/:title", (req, res) => {
    Article.findOne({ title: req.params.title }).then((artic) => {
        if (!artic) {
            return res.status(400).send("Unable to find user");
        }
        res.status(200).send(artic);
    });
});

module.exports = router;
