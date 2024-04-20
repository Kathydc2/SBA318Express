const express = require("express");
const router = express.Router();
const avengers = require("../data/avengers");


// ------------------------------------[GET]
//  tradition to use "api"
//  tradition to use res.json but you can also use res.send

router.get("/",(req, res) => {
    // console.log(avengers)
    res.json(avengers)
});

// ---------------------------------[GET = specific]
//  parseINT ensures that 'avengerId' is explicitly converted to a number
//  want to loosely check using '==' ex: `1=='1'` would evaluate to `true`
//  check if Avenger was found and if not send an error

router.get('/:id', (req, res, next) => {
    const avengerId = parseInt(req.params.id); 
    const avenger = avengers.find(avenger => avenger.id == avengerId); 
    // if (!avenger) { 
    //     return res.status(404).json({ error: 'Avenger not found' });
    // }
    if (avenger) {
        res.json(avenger);
    }
    else next()
});

// --------------------------[Post]
router.post("/", (req, res) => {
    const newAvenger = req.body;
    avengers.push(newAvenger);
    res.json(avengers);
});

// --------------------------[Patch]
router.patch("/:id", (req, res, next) => {
    const avenger = avengers.find((avenger, i) => {
        if (avenger.id == req.params.id) {
            for (const key in req.body) {
                avengers[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (avenger) {
        res.json(avenger);
    }
    else next()
    // else {
    //     res.status(404).json({ error: "Avenger not found" });
    // }
});

// ---------------------------[Delete]
router.delete("/:id", (req, res, next) => {
    const avenger = avengers.find((avenger, i) => {
        if (avenger.id == req.params.id) {
            avengers.splice(i, 1);
            return true;
        }

    });

    if (avenger) {
        res.json(avenger);
    } 
    else next()
    // else {
    //     res.status(404).json({ error: "Avenger not found" });
    // }
})

module.exports = router;