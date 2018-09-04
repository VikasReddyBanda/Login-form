const express=require('express');
const app=express();

app.use(express.static('public'));
const courses=[
    {id:1,name:'node js'},
    {id:2,name:'express js'},
    {id:3,name:'react js'}
];

app.use(express.static('public'));
app.get('/',(req,res) =>{
    res.send('hello world!!!');
});
    app.get('/api/courses/:id',(req,res) =>{
       const course=courses.find(c=>c.id===parseInt(req.params.id));
       if(!course) res.status(404).send('the course with the given Id was not found');

        res.send(course);
    
});
app.listen(3000,() =>console.log('listening on port 3000...'));