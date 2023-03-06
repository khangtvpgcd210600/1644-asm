const express = require('express');
const router  = express('router');
const toy = require('../models/toy');

router.get('/', (req, res, next) => {
    toy.find()
    .then(docs => {
    res.render('home', { toys: docs });
    })
    .catch(err => {
    console.log("Something is wrong", err);
    });
});

router.post('/add', async (req, res, next) => {
    // const name = req.body.name;
    // const quantity = req.body.quantity;
    // const publisher = req.body.publisher;

    const {name, quantity, publisher} = req.body;

    console.log(name, quantity, publisher);

    const newtoy = new toy({
        name,
        quantity,
        publisher
    });
    try {
        const result = await newtoy.save();
        console.log("Data is stored.");
        res.redirect('/');
    } catch (err) {
        console.log("Something went wrong:", err);
    }
});


router.get('/edit/:id', (req, res, next) => {
    toy.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(docs => {
            res.render('edit', {toy : docs});
        })
        .catch(err => {
            console.log("Can't retrieve data");
        });
});



router.post('/edit/:id', async (req, res, next) => {
    try {
        const updatedToy = await toy.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true });
        console.log("Update success");
        res.redirect('/');
    } catch (error) {
        console.log("Something went wrong", error);
        next(error);
    }
})

router.get('/delete/:id', (req, res, next)=> {
    toy.findByIdAndDelete(req.params.id)
        .then((docs) => {
            console.log("Delete success");
            res.redirect('/');
        })
        .catch((err) => {
            console.log("Something wrong");
            next(err);
        });
});


module.exports = router;