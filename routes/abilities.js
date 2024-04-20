const express = require("express");
const router = express.Router();
const abilities = require("../data/abilities");

// ------------------------------------[GET]
router.get("/", (req, res) => {
    // console.log(abilities)
    res.json(abilities)
});

// ---------------------------------[GET = specific]
router.get('/:id', (req, res, next) => {
    const abilityId = parseInt(req.params.id); 
    const ability = abilities.find(ability => ability.id == abilityId); 
    // if (!ability) { 
    //     return res.status(404).json({ error: 'Ability not found' });
    // }
   if (ability) res.json(ability);
   else next()
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

    if (ability) {
        res.json(ability);
    } 
    else next()
    // {
    //    res.status(404).json({ error: "Avenger not found" });
    // }
})

module.exports = router;