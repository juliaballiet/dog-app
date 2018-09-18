const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*
 * GET route
 */
router.get('/feeding/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/feeding GET route', req.params.id);
        const queryText = `SELECT "feedings".*, "foods"."brand", "foods"."variety" 
            FROM "feedings"
            JOIN "foods" ON "foods"."id" = "feedings"."food_id"
            WHERE "dog_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/dog GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/exercise/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/exercise GET route', req.params.id);
        const queryText = `SELECT * FROM "exercise" 
        JOIN "activities_exercise" 
        ON "activities_exercise"."exercise_id" = "exercise"."id"
        JOIN "activities"
        ON "activities"."id" = "activities_exercise"."activity_id"
        WHERE "dog_id" = $1`;
        pool.query(queryText, [req.params.id]).then((results) => {
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

/*
 * PUT route
 */


module.exports = router;