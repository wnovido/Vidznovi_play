'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    AppSetup = mongoose.model('AppSetup'),
    _ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};


exports.getAppSetupValue = function(req, res) {
    AppSetup.findOne().where('name').equals(req.params.appSetupName).sort('-created').populate('user', 'displayName').exec(function(err, appSetup) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(appSetup);
        }
    });
};
