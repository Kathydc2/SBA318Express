const express = require("express");
const router = express.Router();
const abilities = require("../Data/abilities");
const fs = require('fs');

// ------------------------------------[GET]
router.get("/", (req, res) => {
    // console.log(abilities)
    res.json(abilities)
});

// ---------------------------------[GET = specific]
router.get('/:id', (req, res, next) => {
    const abilityId = parseInt(req.params.id); 
    const ability = abilities.find(ability => ability.id == abilityId); 
    if (!ability) { 
        const err = new Error('Avenger not found');
        err.status = 404;
        return next(err);
    }
   
    res.json(ability);
});

// --------------------------[Post]
router.post("/", (req, res) => {
    const newAbility = req.body;
    abilities.push(newAbility);
    res.json(abilities);
});

// ---------------------------[Delete]
router.delete("/:id", (req, res, next) => {
    const ability = abilities.find((ability, i) => {
        if (ability.id == req.params.id) {
            abilities.splice(i, 1);
            return true;
        }

    });

    if (!ability) { 
        const err = new Error('Avenger not found');
        err.status = 404;
        return next(err);
    }
   
    res.json(ability);
})

module.exports = router;