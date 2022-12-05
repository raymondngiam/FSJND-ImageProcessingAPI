import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
});

// for dummy test
function add(a: number, b: number):number{ return a + b };

export default {add};