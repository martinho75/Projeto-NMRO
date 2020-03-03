const { check, validationResult } = require('express-validator');

module.exports = function(application){

	application.get('/jogo', function(req, res){
		application.app.controllers.jogo.jogo(application, req, res);
	});

	application.get('/sair', function(req, res){
		application.app.controllers.jogo.sair(application, req, res);
	});

	application.get('/suditos', function(req, res){
		application.app.controllers.jogo.suditos(application, req, res);
	});

	application.get('/pergaminhos', function(req, res){
		application.app.controllers.jogo.pergaminhos(application, req, res);
	});

	application.post('/ordenar_acao_suditos',[
		check('acao').not().isEmpty().withMessage('acoes não pode estar vazio'),
		check('quantidade').not().isEmpty().withMessage('quantidade não pode estar vazio')
	], function(req, res){

		application.app.controllers.jogo.ordenar_acao_suditos(application, req, res, validationResult);
	});

	application.get('/revogar_acao', function(req, res){
		application.app.controllers.jogo.revogar_acao(application, req, res);
	});
	
}