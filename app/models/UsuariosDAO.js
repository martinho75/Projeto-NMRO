const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const crypto = require('crypto');

function UsuariosDAO(){
   
}

UsuariosDAO.prototype.inserirUsuarios = function(usuario,res){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);

        const msgCadastradoComSucesso = ' cadastrado com sucesso podes fazer o login';

        const senhaCrypto = crypto.createHash('md5').update(usuario.senha).digest('hex');
        usuario.senha = senhaCrypto;

        const collection = db.collection('usuarios');
      
        collection.insertOne(usuario);
        res.render('index', {validacao: {}, dadosForm: {}, msgCadastradoComSucesso:{}});
        client.close();
      });
} 

UsuariosDAO.prototype.autenticar = function(usuario, req, res){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);

        const collection = db.collection('usuarios');

        const senhaCrypto = crypto.createHash('md5').update(usuario.senha).digest('hex');
        usuario.senha = senhaCrypto;
        
         collection.find(usuario).toArray(function(err, docs) {
            assert.equal(err, null);
            if(docs[0] != undefined){
                req.session.autorizado = true;

                req.session.usuario = docs[0].usuario;
                req.session.casa = docs[0].casa;
            }
            if(req.session.autorizado){
                res.redirect("jogo");
            }else{
                res.render("index",{validacao: {}, dadosForm: {}, msgCadastradoComSucesso:{} });
            }
          });
        client.close();
      });
} 

module.exports = function(){
    return UsuariosDAO;
}