// ---------- Functions ---------- //

// Attempts to replace a specific variable in a template.
var replaceVariable = function (page, variables, result) {

	var variable = result[1].trim();

	if (variable in variables) {
		var value = variables[variable];
		page.data = page.data.replace(result[0], value);
	} else {
		page.success = false;
	}

}


// Replaces the variables in the template with their values.
var fillVariables = function (page, variables) {

	var re = /\{\{([^}]+)\}\}/g;

	while ((result = re.exec(page.data)) && page.success == true) {

		replaceVariable(page, variables, result);

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
