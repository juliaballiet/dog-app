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

router.get('/feeding-dates/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/feeding-dates GET route', req.params.id);
        const queryText = `SELECT DISTINCT "date" FROM "feedings" WHERE "dog_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/feeding-dates GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/feeding-entry', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/feeding-dates GET route', req.params.id);
        const queryText = `SELECT * FROM "feedings" 
        JOIN "foods" ON "foods"."id" = "feedings"."food_id" 
        WHERE "date" = $1 AND "dog_id" = $2`;
        pool.query(queryText, [req.query.date, req.query.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/feeding-dates GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/exercise/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/exercise GET route', req.params.id);
        const queryText = `SELECT DISTINCT "date", "notes", "duration", "id" FROM "exercise" WHERE "dog_id" = $1 ORDER BY "date";`
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

router.get('/activities/:id/:date', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/chart/:date/:id GET route ', req.params.date, req.params.id);
        const queryText = `SELECT "activities"."name" FROM "activities" 
        JOIN "activities_exercise" ON "activities_exercise"."activity_id" = "activities"."id" 
        JOIN "exercise" ON "exercise"."id" = "activities_exercise"."exercise_id" 
        WHERE "date" = $1 AND "dog_id" = $2;`;
        pool.query(queryText, [req.params.date, req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/exercise GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

router.get('/skills/:id/:date', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/chart/:date/:id GET route ', req.params.date, req.params.id);
        const queryText = `SELECT "skills"."name" FROM "training" 
        JOIN "skills_training" ON "skills_training"."training_id" = "training"."id" 
        JOIN "skills" ON "skills"."id" = "skills_training"."skill_id" 
        WHERE "date" = $1 AND "dog_id" = $2;`;
        pool.query(queryText, [req.params.date, req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('/exercise GET route error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

router.get('/training/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/log/training GET route', req.params.id);
        const queryText = `SELECT DISTINCT "date", "notes", "duration", "id" FROM "training" WHERE "dog_id" = $1 ORDER BY "date";`;
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
        const queryText = `INSERT INTO "feedings" ("dog_id", "food_id", "date", "time", "amount")
        VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText, [req.body.dog_id, req.body.food_id, req.body.date, req.body.time, req.body.amount]).then((results) => {
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
                console.log(req.body);
                await client.query('BEGIN');
                let queryText = `INSERT INTO "exercise" ("dog_id", "date", "duration", "notes")
                VALUES ($1, $2, $3, $4) RETURNING "id";`;
                const values = [req.body.dog_id, req.body.date, req.body.duration, req.body.notes];
                const exerciseResult = await client.query(queryText, values);
                const exerciseId = exerciseResult.rows[0].id;

                queryText = `INSERT INTO "activities_exercise" ("activity_id", "exercise_id")
                VALUES ($1, $2);`;
                // for (let activity of req.body.activity_id) {
                    await client.query(queryText, [req.body.activity_id, exerciseId]);
                // }
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

router.post('/training', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "training" ("dog_id", "date", "duration", "notes")
                VALUES ($1, $2, $3, $4) RETURNING "id";`;
                const values = [req.body.dog_id, req.body.date, req.body.duration, req.body.notes];
                const trainingResult = await client.query(queryText, values);
                const trainingId = trainingResult.rows[0].id;

                queryText = `INSERT INTO "skills_training" ("skill_id", "training_id")
                VALUES ($1, $2);`;
                // for (let skill of req.body.skill_id) {
                    await client.query(queryText, [req.body.skill_id, trainingId]);
                // }
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