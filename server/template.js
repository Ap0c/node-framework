// ---------- Requires ---------- //

var fs = require('fs');


// ---------- Setup ---------- //

var TEMPLATE_DIR = "templates/"


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


// 
var handleExtends = function(page, parentName) {

	var child = page.data;

	fs.readFile(parentName, "utf8", function(err, template) {

		if (err) {
			page.success = false;
		} else {
			returnTemplate(response, template, variables);
		}

	});

}


// Chooses what to do depending on statement action.
var handleStatement = function (page, statement) {

	var operator = statement[0];

	if (operator == "extends") {
		handleExtends(page, statement[1])
	} else if (operator != "section" && operator != "endsection") {
		page.success = false;
	}

}


// Parses logic statement.
var processStatement = function (page, result) {

	var statement = result[1].trim().split(" ");

	if (statement.length == 2) {
		handleStatement(page, statement);
	} else {
		page.success = false;
	}

}


// Carries out logic statements in the template.
var processLogic = function (page) {

	var re = /\{\%([^%]+)\%\}/g;

	while ((result = re.exec(page.data)) && page.success == true) {

		processStatement(page, result);

	}

}


// Runs the renderer on a template.
var renderTemplate = function (name, variables, response) {

	var page = {success: true, data: ""};
	name = TEMPLATE_DIR + name;

	fs.readFile(name, "utf8", function(err, template) {

		if (err) {
			page.success = false;
		} else {
			page.data = template;
			// processLogic(page);
			if (page.success) {
				fillVariables(page, variables);
			}
		}
		response(page);

	});

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
