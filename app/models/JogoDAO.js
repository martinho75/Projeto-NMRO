const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
const assert = require('assert');

function JogoDAO(){
   
}

JogoDAO.prototype.gerarParametros = function(usuario,res){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);

        const msgCadastradoComSucesso = ' cadastrado com sucesso podes fazer o login';

        const collection = db.collection('jogo');
      
        collection.insertOne({
            usuario: usuario,
            moeda: 15,
            suicidios: 10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000),
        });
        res.render('index', {validacao: {}, dadosForm: {}, msgCadastradoComSucesso});
        client.close();
      });
} 

JogoDAO.prototype.iniciarJogo = function(usuario,res, req, msg){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);

        const collection = db.collection('jogo');
      
        collection.find({usuario: usuario}).toArray(function(err, docs){
            res.render('jogo', {img_casa: req.session.casa, jogo: docs[0], msg: msg});

            client.close();
        });
      });
} 

JogoDAO.prototype.acao =  function(acao){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);
        const collection = db.collection('acao');
        const collection_update = db.collection('jogo');

        var date = new Date();
        var tempo = null;
        
        switch(parseInt(acao.acao)){
            case 1: tempo = 1 * 60 * 60000; break;
            case 2: tempo = 2 * 60 * 60000; break;
            case 3: tempo = 5 * 60 * 60000; break;
            case 4: tempo = 5 * 60 * 60000; break;
        }

        acao.acao_termina_em = date.getTime() + tempo;
        collection.insertOne(acao);

        var moedas = null;
        switch(parseInt(acao.acao)){
            case 1: moedas = -2 * acao.quantidade; break;
            case 2: moedas = -3 * acao.quantidade; break;
            case 3: moedas = -1 * acao.quantidade; break;
            case 4: moedas = -1 * acao.quantidade; break;
        }
        collection_update.updateOne( 
            {usuario: acao.usuario},
            {$inc: {moeda : moedas}}
            );

        client.close();
      });

    console.log(acao);
}


module.exports = function(){
    return JogoDAO;
}


JogoDAO.prototype.getAcoes = function(usuario, res){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);
        const collection = db.collection('acao');
        
        var date = new Date();
        var momento_actual = date.getTime();

        collection.find({usuario: usuario, acao_termina_em:{$gt : momento_actual}}).toArray(function(err, docs){
            res.render('pergaminhos', { acoes: docs});
            client.close();
        });
      });
} 


JogoDAO.prototype.revogarAcao = function( res, _id){

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true,}, function(err, client) {
        assert.equal(null, err);
        const db = client.db(config.db_name);
        const collection = db.collection('acao');
       
        IdDoc = _id.id_acao
        console.log(IdDoc);

        collection.deleteOne(
            {"_id": objectId(IdDoc)},
            
            function(err, result){
                res.redirect('jogo?msg=D');
                client.close();
            }
        );

      });
} 