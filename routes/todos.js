const router = require("express").Router();
const models = require('../db/models/index');

// API Routes
router.route("/")
    .get(function (req, res) {
        models.Todo.findAll({})
          .then(dbModel => {
            res.json(dbModel);
        })
          .catch(err => res.status(422).json(err));
    })
    .post(function (req, res) {
		models.Todo.create({
            title: req.body.title,
            complete: false,
            UserId: req.body.UserId
		}).then(function(todo) {
		    res.json(todo);
		});
    });

module.exports = router;
