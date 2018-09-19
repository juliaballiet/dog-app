const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
 * GET route
 */
router.get('/food', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/food GET route', req.user.id);
        const queryText = `SELECT * FROM "foods" WHERE "user_id" = $1 ORDER BY "id";`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/food GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/activities', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/activities GET route', req.user.id);
        const queryText = `SELECT * FROM "activities" WHERE "user_id" = $1 ORDER BY "id";`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/activities GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/*
 * POST route template
 */
router.post('/food', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/food POST route: ', req.body);
        const queryText = `INSERT INTO "foods" ("brand", "variety", "type", "amount", "user_id")
        VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText, [req.body.brand, req.body.variety, req.body.type,
        req.body.amount, req.user.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('/food POST route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/*
 * PUT route
 */
router.put('/food', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/food PUT route with: ', req.body);
        const queryText = `UPDATE "foods" SET "brand" = $1, "variety" = $2, 
        "type" = $3, "amount" = $4 WHERE "id" = $5;`;
        pool.query(queryText, [req.body.brand, req.body.variety, req.body.type,
        req.body.amount, req.body.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('/food PUT route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

router.put('/activities', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/activities PUT route with: ', req.body);
        const queryText = `UPDATE "activities" SET "activity" = $1, "description" = $2 
        WHERE "id" = $3;`;
        pool.query(queryText, [req.body.activity, req.body.description, req.body.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('/food PUT route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;