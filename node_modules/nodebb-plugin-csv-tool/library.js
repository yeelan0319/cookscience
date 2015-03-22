"use strict";

var file = module.parent.require('./file'),
	fs = module.parent.require('fs'),
	multipart = module.parent.require('connect-multiparty');

(function(module) {

	var Plugin = {};

	function uploadcsv(req, res, next) {
		console.log(req);
		var uploadedFile = req.files.files[0];
		console.log("!!!!" + uploadedFile.type);
		if(uploadedFile.type !== "text/csv"){
			fs.unlink(uploadedFile.path);

			next(new Error('["Invalid file type. Allowed types is csv"'));
			return false;
		}
		else{
			console.log("here");
			file.saveFileToLocal(uploadedFile.name, 'files', uploadedFile.path, function(err, file){
				fs.unlink(uploadedFile.path);
				if(err){
					return next(err);
				}

				res.json({name: uploadedFile.name, url: file.url});
			});
		}
	}

	function renderAdmin(req, res, next){
		res.render("admin/plugins/cvs-tool", {csrf: req.csrfToken()});
	};

	Plugin.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware,
			controllers = params.controllers,
			multipartMiddleware = multipart();

		var middlewares = [multipartMiddleware, middleware.validateFiles, middleware.applyCSRF, middleware.authenticate];

		app.post('/admin/uploadcsv', middlewares, uploadcsv);
		app.get('/admin/plugins/csv-tool', middleware.admin.buildHeader, renderAdmin);

		callback();
	};

	Plugin.addAdminNavigation = function(header, callback) {
	    header.plugins.push({
	      route: '/plugins/csv-tool',
	      name: 'Import/Export CSV'
	    });
	    callback(null, header);
  	};

	module.exports = Plugin;

}(module));