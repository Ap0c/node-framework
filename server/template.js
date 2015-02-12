// ---------- Functions ---------- //

// Replaces the variables in the template with their values.
var fillVariables = function (template, variables) {

	var re = /\{\{([^}]+)\}\}/g;

	while (result = re.exec(template)) {

		var variable = result[1].trim();
		var value = variables[variable];
		template = template.replace(result[0], value);

	}

	return template;

}


// Runs the renderer on a template.
var renderTemplate = function (template, variables) {

	template = fillVariables(template, variables);

	var page = {success: true, data: template};

	return page;

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
