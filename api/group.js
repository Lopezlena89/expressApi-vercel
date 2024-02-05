/*
    Events Routes
    
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getGroup, crearGroup,eliminarGroup,crearMessageGroup,eliminarMessageGroup } = require('../controllers/group');

const router = Router();

//Todas tienen que pasar por la validacion del JWT 
router.use(validarJWT);
//Obtener grupo
router.get( '/', getGroup );
//Obtener message

//Crear un nuevo grupo
router.post( '/',validarJWT,crearGroup );
router.post( '/:id',crearMessageGroup );

// Eliminar evento
router.delete( '/:id', eliminarGroup);
router.delete( '/:id/:msg', eliminarMessageGroup);

module.exports = router;