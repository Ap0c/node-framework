// ---------- Requires ---------- //


// ---------- Functions ---------- //

// Runs the renderer on a template.
var renderTemplate = function(template, variables) {

	var page = {success: true, data: template};

	return page;

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
