var db = require("../models");



module.exports = function(app) {
    // const db = await csvdb("/api/routes/:book/:cat", ["user_id", "book_id", "cat_id"]);

    // findAll route

    app.get("/api/add/:book/:cat", function(req, res) {
        if (req.session.passport) {
            db.reads_lists.findAll({
                user_id: profile.uid,
                book_id: req.params.book,
                cat_id: req.params.cat_id
            }).then(() => {
                res.json("something happened");
            });
        } else {
            res.json("nothing happened")
        }

    });


    // app.get("/api/add/:book/:cat", function (req, res) {
    //     if (req.session.passport) {
    //         db.reads_lists.findAll({
    //             user_id: profile.uid,
    //             book_id: req.params.book,
    //             cat_id: req.params.cat_id
    //      }).then(function (dbPost) {
    //         res.json(dbPost);
    //     });
    // });

    // // add csv
    // // // app.get("/test",function(req,res){
    // async function db.get() {
    //     console.log('calling');
    //     var result = await resolveAfter2Seconds();
    //     console.log(result);
    //     // expected output: 'resolved'
    // }

    // db.get();


    // await db.get();
    // [
    //     { id: 1, name: "johndoe", mail: "john@github.com" },
    //     { id: 2, name: "frankmass", mail: "frankmass@github.com" }
    // ]
    // });




    // new api list findOne
    // app.get("/api/posts/:book:cat", function (req, res) {
    //     if (req.session.passport) {
    //         db.reads_lists.findOne({
    //             user_id: profile.uid,
    //             book_id: req.params.book,
    //             cat_id: req.params.cat_id
    //         }).then(() => {
    //             res.json("something happened");
    //         });
    //     } else {
    //         res.json("nothing happened")
    //     }
    // });



    app.get("/api/posts/:id", function(req, res) {
        if (req.session.passport) {
            db.reads_lists.findOne({
                user_id: profile.uid,
                book_id: req.params.book,
                cat_id: req.params.cat_id

            }).then(function(dbPost) {
                res.json(dbPost);
            });
        };
    });

    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        db.Post.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    });


    // Edit csv
    // app.post("/test2", function (req, res) {

    //     await db.edit({ name: "johndoe" }, { mail: "john@gitlab.com" });
    //     [{ 1, "johndoe", "john@gitlab.com"}]

    // });

    // New delete
    // app.delete("/api/posts/:book:cat", function (req, res) {
    //     if (req.session.passport) {
    //         db.reads_lists.delete({
    //           user_id: profile.uid,
    //           book_id: req.params.book,
    //           cat_id: req.params.cat_id
    //         }).then(() => {
    //           res.json("something happened");
    //         });
    //       } else {
    //         res.json("nothing happened")
    //       }
    //     });

    // DELETE route for deleting posts
    // app.delete("/api/posts/:id", function (req, res) {
    //     db.Post.destroy({
    //         if(req.session.passport) {
    //         db.reads_lists.delete({
    //             user_id: profile.uid,
    //             book_id: req.params.book,
    //             cat_id: req.params.cat_id

    //         }).then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    //     });

    //  delete csv
    // app.delete("/test3", function (req, res) {
    //     await db.delete({ id: 1 });
    //     [{ id: 1, name: "johndoe", mail: "john@github.com" }]

    // });



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
    // app.put("/test4", function (req, res) {
    //     await db.add({ id: 3, name: "stevejobs", mail: "jobs@github.com" });
    //     [{ id: 3, name: "stevejobs", mail: "jobs@github.com" }]
    // });



};