const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Rota para obter todas as pessoas
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter uma pessoa por ID
router.get('/:id', getPerson, (req, res) => {
    res.json(res.person);
});

// Rota para criar uma nova pessoa
router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para atualizar uma pessoa por ID
router.put('/:id', getPerson, async (req, res) => {
    if (req.body.name != null) {
        res.person.name = req.body.name;
    }
    if (req.body.age != null) {
        res.person.age = req.body.age;
    }
    try {
        const updatedPerson = await res.person.save();
        res.json(updatedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para excluir uma pessoa por ID
router.delete('/:id', getPerson, async (req, res) => {
    try {
        await res.person.remove();
        res.json({ message: 'Pessoa deletada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getPerson(req, res, next) {
    let person;
    try {
        person = await Person.findById(req.params.id);
        if (person == null) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.person = person;
    next();
}

module.exports = router;
