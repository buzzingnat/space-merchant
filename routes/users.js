const router = require("express").Router();
const models = require('../db/models/index');

// API Routes
router.route("/")
    .get(function (req, res) {
        models.User.findAll({})
          .then(dbModel => {
            res.json(dbModel);
        })
          .catch(err => res.status(422).json(err));
    })
    .post(function (req, res) {
		models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            createdAt : new Date(),
            updatedAt : new Date(),
		}).then(function(user) {
		    res.json(user);
		});
    });

if (process.env.NODE_ENV !== 'production') {
    console.log('Not in production!!!');
    router.route("/new")
        .post(function (req, res) {
            models.User.create({
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                createdAt : new Date(),
                updatedAt : new Date(),
            }).then(function(user) {
                res.json(user);
            });
        });
}

module.exports = router;
