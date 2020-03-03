const { check, validationResult } = require('express-validator');

module.exports = function(application){

	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastro.cadastro(application, req, res);
	});

	application.post('/cadastrar',[
		check('nome').not().isEmpty().withMessage('nome não pode estar vazio'),
		check('usuario').not().isEmpty().withMessage('usuário não pode estar vazio'),
		check('senha').not().isEmpty().withMessage('senha não pode estar vazio'),
		check('casa').not().isEmpty().withMessage('casa não pode estar vazio')
	],function(req, res){
		application.app.controllers.cadastro.cadastrar(application, req, res, validationResult);
	});

}