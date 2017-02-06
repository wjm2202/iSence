// Import dependencies
const mongoose = require('mongoose');   //import mongoose 
const express = require('express');     //import express
const router = express.Router();        //create router

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';                 //db connenction string 

// Connect to mongodb
mongoose.connect(dbHost);                                       //connect to DB

// create mongoose schema
const userSchema = new mongoose.Schema({                       //creating the mongodb table schema
  name: String,                                                //variable name is a string
  age: Number                                                  //viable age is a number
});

// create mongoose model
const User = mongoose.model('User', userSchema);              //construct table named User using userSchema defined above 

/* GET api listing. */
router.get('/', (req, res) => {                              //get request for api listing lambda function
        res.send('api works');                               //default reply api works returned
});

/* GET all users. */
router.get('/users', (req, res) => {                        //get users request  
    User.find({}, (err, users) => {                         //errors???
        if (err) res.status(500).send(error)                //if error return error to caller

        res.status(200).json(users);                       //else return 200: users.json
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {                  //get request for specific id
    User.findById(req.param.id, (err, users) => {         //find user by id for single user req.param.id
        if (err) res.status(500).send(error)              //if error return error to caller

        res.status(200).json(users);                      //return 200: users.json
    });
});

/* Create a user. */
router.post('/users', (req, res) => {                     //post request for commiting to DB
    let user = new User({                                 //create a new user object 
        name: req.body.name,                              //variable name req.body.name prevent from continuing till complete
        age: req.body.age                                 //variable req.body.age prevent from continuing till complete
    });

    user.save(error => {                                  //call save on name and age feilds in form if both are complete
        if (error) res.status(500).send(error);           //if the DB returns an error return to caller

        res.status(201).json({                            //else return 201: "user created succesfully"
            message: 'User created successfully'          //json message returned 
        });
    });
});

module.exports = router;                                 // 