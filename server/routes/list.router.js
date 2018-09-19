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

/**
 * POST route template
 */
router.post('/', (req, res) => {

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

module.exports = router;