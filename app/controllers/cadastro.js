module.exports.cadastro = function(aplications, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {} });
}
module.exports.cadastrar = function(aplications, req, res, validationResult){
    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('cadastro', {validacao: errors.array(), dadosForm: dadosForm});
        return;
    }
    
    const UsuariosDAO = new aplications.app.models.UsuariosDAO(); 
    const JogoDAO = new aplications.app.models.JogoDAO(); 

    UsuariosDAO.inserirUsuarios(dadosForm, res);
    JogoDAO.gerarParametros(dadosForm.usuario, res);
    //gerar paramentros

}