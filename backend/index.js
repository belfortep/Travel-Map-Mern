const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const pinRoutes = require('./routes/pins')
const userRoutes = require('./routes/users')
const cors = require('cors')
//----------------------------------------CONFIGURACION----------------------------------------

dotenv.config()

app.set('port', process.env.PORT || 5000)

app.use(express.json())

app.use(cors())

//----------------------------------------CONEXION BBDD----------------------------------------

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => { console.log('DB CONNECTED') })
    .catch((err) => { console.log(err) })


//----------------------------------------RUTAS----------------------------------------

app.use('/api/pins', pinRoutes);

app.use('/api/users', userRoutes);


//----------------------------------------ABRIENDO SERVIDOR...----------------------------------------
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'))
})



