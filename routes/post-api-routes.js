var db = require("../models");
var path = require("csv-database");


module.exports = function(app) {

    app.get("/api", function(req, res) {
        var query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }

        db.Post.findAll({
            where: query,
            include: [db.Author]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // add csv
    app.get("/test", function(req, res) {

        db.get();
        [
            { id: 1, name: "johndoe", mail: "john@github.com" },
            { id: 2, name: "frankmass", mail: "frankmass@github.com" }
        ]
    });


    app.get("/api/add", function(req, res) {

        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Author]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });


    // Edit csv
    app.post("/test2", function(req, res) {

        db.edit({ name: "johndoe" }, { mail: "john@gitlab.com" });
        [{ id: 1, name: "johndoe", mail: "john@gitlab.com" }]

    });

    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function(req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });


    app.delete("/test3", function(req, res) {
        db.delete({ id: 1 });
        [{ id: 1, name: "johndoe", mail: "john@github.com" }]

    });



    // PUT route for updating posts
    app.put("/api/posts", function(req, res) {
        db.Post.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // csv add
    app.put("/test4", function(req, res) {
        db.add({ id: 3, name: "stevejobs", mail: "jobs@github.com" });
        [{ id: 3, name: "stevejobs", mail: "jobs@github.com" }]
    });
};