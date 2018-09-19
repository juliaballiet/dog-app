const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
 * GET route
 */
router.get('/food', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/list/food GET route', req.user.id);
        const queryText = `SELECT * FROM "foods" WHERE "user_id" = $1;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/feeding GET route error: ', error);
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


module.exports = router;