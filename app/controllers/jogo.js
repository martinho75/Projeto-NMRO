module.exports.jogo = function(aplication, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }
    var msg = ''
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    console.log(msg);

    const JogoDAO = new aplication.app.models.JogoDAO(); 
    const usuario = req.session.usuario;

    JogoDAO.iniciarJogo(usuario, res, req, msg);
}

module.exports.sair = function(aplication, req, res){
    req.session.destroy(function(err){
        res.render('index',{validacao: {}, dadosForm: {}, msgCadastradoComSucesso: {}} );
    });
} 

module.exports.suditos = function(aplication, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    res.render('aldeoes');
} 

module.exports.pergaminhos = function(aplication, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const JogoDAO = new aplication.app.models.JogoDAO(); 
    const usuario = req.session.usuario;
    /* recuperar as acoes que estão no banco de dados */
    JogoDAO.getAcoes(usuario, res);
} 

module.exports.ordenar_acao_suditos = function(aplication, req, res, validationResult){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.redirect('jogo?msg=A');
        return;
    }

    const jogoDAO = new aplication.app.models.JogoDAO();

    dadosForm.usuario = req.session.usuario;

    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');

} 

module.exports.revogar_acao = function(aplication, req, res){
    const url_query = req.query;

    const jogoDAO = new aplication.app.models.JogoDAO();

    var _id = url_query;

    jogoDAO.revogarAcao( res, _id);

}