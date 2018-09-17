const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;