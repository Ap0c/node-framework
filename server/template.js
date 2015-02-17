// ---------- Functions ---------- //

// Replaces the variables in the template with their values.
var fillVariables = function (page, variables) {

	var re = /\{\{([^}]+)\}\}/g;

	while ((result = re.exec(page.data)) && page.success == true) {

		var variable = result[1].trim();

		if (variable in variables) {
			var value = variables[variable];
			page.data = page.data.replace(result[0], value);
		} else {
			page.success = false;
		}

	}

}


// Runs the renderer on a template.
var renderTemplate = function (template, variables) {

	var page = {success: true, data: template};

	fillVariables(page, variables);

	return page;

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
