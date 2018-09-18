const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
 * GET route
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/dogs GET route', req.user.id);
        const queryText = `SELECT * FROM "dogs" WHERE "user_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/dog GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/dogs/:id GET route', req.params.id);
        const queryText = `SELECT * FROM "dogs" WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/dogs/:id GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

/*
 * PUT route
 */
router.put('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/dogs PUT route', req.body);
        const queryText = `UPDATE "dogs" SET "name" = $1, "breed" = $2, 
            "weight" = $3, "birthday" = $4 WHERE "id" = $5;`;
        pool.query(queryText, [req.body.name, req.body.breed, req.body.weight,
        req.body.birthday, req.body.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/dogs PUT route error: ', error);
            res.sendStatus(500);
        })
    }
})

module.exports = router;