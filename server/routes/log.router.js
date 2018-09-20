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
            console.log('/feeding GET route error: ', error);
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
            console.log('/exercise GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/training/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/training GET route', req.params.id);
        const queryText = `SELECT * FROM "training" 
        JOIN "skills_training" 
        ON "skills_training"."training_id" = "training"."id"
        JOIN "skills"
        ON "skills"."id" = "skills_training"."skill_id"
        WHERE "dog_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/training GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/feeding', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/feeding POST with: ', req.body);
        const queryText = `INSERT INTO "feedings" ("dog_id", "food_id", "date", "time")
        VALUES ($1, $2, $3, $4);`;
        pool.query(queryText, [req.body.dog_id, req.body.food_id, req.body.date, req.body.time]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/feeding POST route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.post('/exercise', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "exercise" ("dog_id", "date", "duration", "notes")
                VALUES ($1, $2, $3, $4) RETURNING "id";`;
                const values = [req.body.dog_id, req.body.date, req.body.duration, req.body.notes];
                const exerciseResult = await client.query(queryText, values);
                const exerciseId = exerciseResult.rows[0].id;

                queryText = `INSERT INTO "activities_exercise" ("activity_id", "exercise_id")
                VALUES ($1, $2);`;
                for (let activity of req.body.activity_id) {
                    const result = await client.query(queryText, [activity, exerciseId]);
                }
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

/*
 * PUT route
 */


module.exports = router;