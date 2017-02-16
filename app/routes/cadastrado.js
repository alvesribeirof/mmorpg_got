module.exports = function(application){
	application.get('/cadastrado', function(req, res){
		application.app.controllers.cadastrado.cadastrado(application, req, res);
	});
};
