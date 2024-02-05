/*
    Events Routes
    
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMessages, crearMessage,eliminarMessages } = require('../controllers/message');

const router = Router();

//Todas tienen que pasar por la validacion del JWT 
router.use(validarJWT);
//Obtener message
router.get( '/', getMessages );
//Obtener message

//Crear un nuevo message
router.post( '/',validarJWT,crearMessage );

// Eliminar evento
router.delete( '/:id', eliminarMessages );

module.exports = router;