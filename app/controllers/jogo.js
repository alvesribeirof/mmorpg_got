module.exports.jogo = function(application, req, res){

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	
	if(req.session.autorizado !== true){
		res.send('Você precisa efetuar o login');
		return;
	}

	var msg = '';

	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	var usuario = req.session.usuario;
	var casa = req.session.casa;

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, usuario, casa, msg);	
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.render('index', {validacao: {}, usuario: {}, usuarioInvalido: {} });
	});
}

module.exports.suditos = function(application, req, res){

	if(req.session.autorizado !== true){
		res.send('Você precisa efetuar o login');
		return;
	}

	res.render('aldeoes', { validacao : {} });
}

module.exports.pergaminhos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Você precisa efetuar o login');
		return;
	}

	/* recuperar as ações inseridas no banco de daods */
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	var usuario = req.session.usuario;

	JogoDAO.getAcoes(usuario, res);	
}

module.exports.ordenar_acao_sudito = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('Você precisa efetuar o login');
		return;
	}

	var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=Erros');
		return;
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;
	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=Sucesso');
}

module.exports.revogar_acao = function(application, req, res){
	var url_query = req.query;
	
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	var _id = url_query.id_acao;
	JogoDAO.revogarAcao(_id, res);
}