const express = require('express');
const app = express();
const cors = require('cors');

require('./database');


// 1- Lectura y paso de datos por cabezera --> header
// poder comunicarnos con otros servidores
app.use(cors());


// 2 - Optener los datos JSON(undefined) a un formato -> jacascript
app.use(express.json());


app.use('/api', require('./routes/index'))


app.listen(3000);
console.log('Server on port: ', 3000); 