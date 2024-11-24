import express from 'express';
// const  express = require('express');

const app = express();

// app.get('/',(req, res) =>{
// res.send("serve is working ");
// });
// get  a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
    const jokes = [{
        id:1,
        title: 'A joke',
        content: 'This is a joke'

    },
    {
        id:2,
        title: 'Another joke',
        content: 'This is second joke'

    },
    {
        id:3,
        title: 'A third joke',
        content: 'This is third joke'

    },
    {
        id:4,
        title: 'A  fourth joke',
        content: 'This is fourth joke'

    },
    {
        id:5,
        title: 'A fifth joke',
        content: 'This is fifth joke'

    },
    {
        id:6,
        title: 'A sixth joke',
        content: 'This is  sixth joke'

    }]

    res.send(jokes)
})

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log( `Serve at https://localhost:${port}`);
})