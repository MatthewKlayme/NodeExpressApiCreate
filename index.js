const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'matthew'},
    {id: 2, name: 'brandon'},
    {id: 3, name: 'chris'},
    {id: 4, name: 'richie'},
];

app.get('/', (req,res) => {
    res.send("hello world");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('given id not found');
    else res.send(course);
})

app.post('/api/courses', (req,res) => {
    const validator = validateCourse(req.body);
    if(validator.error) return res.status(404).send(validator.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //Look up the paramater
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('given id not found');

    //Validate
    const {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    //Update and Return
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    //Loop up the parameter
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('given id not found');

    //Delete querey
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    //Return response
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}



// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));