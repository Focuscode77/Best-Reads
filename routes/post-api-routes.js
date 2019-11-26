var db = require("../models");


module.exports = function (app) {


    app.get("/api", function (req, res) {
        var query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }

        db.Post.findAll({
            where: query,
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });


    app.get("/api/add", function (req, res) {

        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Author]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // POST route for saving a new post
    app.post("/api/add/:book/:cat", function (req, res) {
        db.reads_lists.create({
            user_id: profile.uid,
            book_id: req.params.book,
            cat_id: req.params.cat_id

        }).then(function (dbPost) {
            res.json("something happened");
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {
        db.Post.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
};