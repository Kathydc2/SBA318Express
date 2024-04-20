const express = require("express");
const router = express.Router();
const actors = require("../data/actors");

// ------------------------------------[GET]
router.get("/", (req, res) => {
    // console.log(actors)
    res.json(actors)
});

// ---------------------------------[GET = specific]
router.get('/:id', (req, res, next) => {
    const actorId = parseInt(req.params.id); 
    const actor = actors.find(actor => actor.id == actorId); 
    if (!actor) { 
        const err = new Error('Avenger not found');
        err.status = 404;
        return next(err);
    }
   
    res.json(actor);
});

// --------------------------[Post]
router.post("/", (req, res) => {
    const newActor = req.body;
    actors.push(newActor);
    res.json(actors);
});

// ---------------------------[Delete]
router.delete("/:id", (req, res, next) => {
    const actor = actors.find((actor, i) => {
        if (actor.id == req.params.id) {
            actors.splice(i, 1);
            return true;
        }

    });
    if (!actor) { 
        const err = new Error('Avenger not found');
        err.status = 404;
        return next(err);
    }
   
    res.json(actor);
})

module.exports = router;