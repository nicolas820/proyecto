const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const fs = require('fs'); 
const app = express(); 

//middeware body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public')); //despachar archivos estaticos

//ruteadores
app.get('/', (req,res) =>{
    res.setHeader('content-type', 'text/html');
    res.sendFile('./public/index.html');
})

app.get('/get-peliculas', (req, res) =>{
    const file = fs.readFileSync('./peliculas.json', 'UTF-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);  
});

app.post('/new', (req, res) =>{
    res.setHeader('content-type', 'text/plain');
    const nombre = req.body.nombre;
    const rating = req.body.rating;
    //abrir archivo
   let file = fs.readFileSync('./peliculas.json', 'UTF-8'); //let varable
    //convertirlo en un arreglo
    const json = JSON.parse(file);
    //insertar nuevo elemento
    json.peliculas.push({"nombre": nombre, "rating": parseInt(rating)});
    //guardar json en el archivo
    file = fs.writeFileSync('./peliculas.json', JSON.stringify(json));

    res.send('guardado con exito');

    //res.send('POST para registrar peliculas'); //de texto
});

app.listen(3001, () =>{
    console.log('servidor iniciado');
});





