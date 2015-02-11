// ---------- Requires ---------- //

var fs = require('fs');


// ---------- Functions ---------- //

// Opens the template file and runs renderer.
var renderTemplate = function(template, variables) {

	var page = {success: true, data: template};

	return page;

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
