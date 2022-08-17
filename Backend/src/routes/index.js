const { Router } = require('express');
const User = require('../models/User');
const router = Router();

const jwt = require('jsonwebtoken');

router.get('/', (req,  res) => res.send('Hello world'))



//async post SING_UP (Guardar usuario)
router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    console.log(newUser);

    //Metodo asincrono para continuar con el proceso del servidor, sin ser interrumpido
    await newUser.save(); 

    // Creo un token y despues se lo devuelvo al usuario. si todo esta bien .status(200)
    const token =  jwt.sign({_id: newUser._id}, 'secretkey')
    res.status(200).json({token})
})


// SIGN_IN (validar usuario)
router.post('/signin', async(req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email})
    
    // SI el correo no fue encontrado
    if(!user) return res.status(401).send("The email doesn´t exist");
    
    //El correo fue encontrado
    if(user.password !== password) return res.status(401).send('wrong password');

    // Si todo fue correcto le devolvemos un token
    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
})


router.get('/task', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            descripcion: 'Learn node.js and next.js',
            date: '2021-02-09T20:39:05.211Z'
        },
        {
            _id: 2,
            name: 'Task one',
            descripcion: 'Learn angular',
            date: '2021-02-09T20:39:05.211Z'
        },
        {
            _id: 3,
            name: 'Task one',
            descripcion: 'Learn css grid layout',
            date: '2021-02-09T20:39:05.211Z'
        },
    ])
})

// Llegamos a la ruta y ejecutamos el verifyToken
router.get('/private-task', verifyToken, (req, res) => {

    res.json([
        {
            _id: 1,
            name: 'Task one',
            descripcion: 'Learn node.js and next.js',
            date: '2021-02-09T20:39:05.211Z'
        },
        {
            _id: 2,
            name: 'Task one',
            descripcion: 'Learn angular',
            date: '2021-02-09T20:39:05.211Z'
        },
        {
            _id: 3,
            name: 'Task one',
            descripcion: 'Learn css grid layout',
            date: '2021-02-09T20:39:05.211Z'
        },
    ])
})

function verifyToken(req, res, next){
    console.log(req.headers.authorization)
    console.log(req.headers.authorization.descripcion)

    //Si no existe 
    if(!req.headers.authorization){
        return res.status(401).send('Unthorize request');
    }

    // ['Bearer','eyJhbGciOiJIUzI1NiIsIn...']
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unthorize request');
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}

module.exports = router;