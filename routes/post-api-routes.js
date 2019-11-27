var db = require("../models");
var path = require("csv-database");


module.exports = function (app) {
    const db = await csvdb("users.csv", ["id","name","mail"]);


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

    // add csv
    app.get("/test",function(req,res){

        await db.get();
        [
            {id: 1, name: "johndoe", mail: "john@github.com"},
            {id: 2, name: "frankmass", mail: "frankmass@github.com"}
        ]
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

// Edit csv
    app.post("/test2", function (req, res) {

        await db.edit({name: "johndoe"}, {mail: "john@gitlab.com"});
        [{1, "johndoe", "john@gitlab.com"}]
        
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


    app.delete("/test3", function (req, res) {
        await db.delete({id: 1});
[ {id: 1, name: "johndoe", mail: "john@github.com"} ]

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

    // csv add
    app.put("/test4", function (req, res) {
        await db.add({id: 3, name: "stevejobs", mail: "jobs@github.com"});
      [{id: 3, name: "stevejobs", mail: "jobs@github.com"}]
    });
};