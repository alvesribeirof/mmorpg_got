module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}, usuario: {}, usuarioInvalido: {} });
}

module.exports.autenticar = function(application, req, res){

	var dadosForm = req.body;

	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao: {}, usuario: {}, usuarioInvalido: {} });
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);	
}