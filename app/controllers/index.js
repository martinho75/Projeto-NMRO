module.exports.index = function(aplication, req, res){
    res.render('index', {validacao: {}, dadosForm: {}, msgCadastradoComSucesso: {}});
}
module.exports.autenticar = function(aplication, req, res, validationResult){
    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('index', {validacao: errors.array(), dadosForm: dadosForm, msgCadastradoComSucesso: {}});
        return;
    }

    const UsuariosDAO = new aplication.app.models.UsuariosDAO();
    
    UsuariosDAO.autenticar(dadosForm, req, res);
}