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


// Returns the contents of a child section.
var childSection = function(child, sectionName) {

	var re = new RegExp("\{\% section " + sectionName +
		" \%\}([^{%]+)\{\% endsection " + sectionName + " \%\}")

	var result = re.exec(child);

	return result[1];

}


// Fills in a specific section in the parent with a child section.
var fillSection = function(child, parent, startSec, endSec) {

	if (endSec == null) {
		parent.success = false;
	} else {

		var sectionContent = childSection(child, startSec[1]);
		var beforeSection = parent.data.substring(0, startSec["index"] - 1);
		var afterSection = parent.data.substring(
			endSec["index"] + endSec[0].length);

		parent.data = beforeSection + sectionContent + afterSection;

	}

}



// Fills in all the sections in the parent with the child sections.
var fillSections = function(child, parent) {

	var startExp = /\{\% section ([^%]+) \%\}/g;

	while ((startSec = startExp.exec(parent.data)) && parent.success == true) {

		var endExp = new RegExp("\{\% endsection " + startSec[1] + " \%\}");
		var endSec = endExp.exec(parent.data);
		fillSection(child, parent, startSec, endSec);

	}

}


// Extends a child template from a specified parent.
var handleInheritance = function(page, parentName, variables, response) {

	var child = page.data;
	parentName = parentName;

	renderTemplate(parentName, variables, function(parent) {

		fillSections(child, parent);
		page.data = parent.data;
		page.success = parent.success;
		response(page);

	});

}


// Checks if this templates inherits from another.
var inheritance = function(page, variables, response) {

	var re = /\{\% extends ([^%]+) \%\}/g;

	var result = re.exec(page.data);

	if (result != null) {
		handleInheritance(page, result[1], variables, response);
		return true;
	}

	return false;

}


// Fills the template and returns it to the client.
var fillTemplate = function (page, variables, response) {

	if (variables != undefined) {
		fillVariables(page, variables);
	}

	if (!inheritance(page, variables, response)) {
		response(page);
	}

}


// Runs the renderer on a template.
var renderTemplate = function (name, variables, response) {

	var page = {success: true, data: ""};
	name = TEMPLATE_DIR + name;

	fs.readFile(name, "utf8", function(err, template) {

		if (err) {
			page.success = false;
			response(page);
		} else {
			page.data = template;
			fillTemplate(page, variables, response);
		}

	});

}


// ---------- Module Exports ---------- //

module.exports = {
	renderTemplate: renderTemplate
}
