const { check, validationResult } = require('express-validator');

module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar',[
		check('usuario').not().isEmpty().withMessage('usuario não pode estar vazio'),
		check('senha').not().isEmpty().withMessage('senha não pode estar vazio')
	], function(req, res){
		application.app.controllers.index.autenticar(application, req, res, validationResult);
	});
}