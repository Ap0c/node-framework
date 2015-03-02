// Chooses what to do depending on statement action.
var handleStatement = function (page, statement) {

	var operator = statement[0];

	if (operator == "extends") {
		handleExtends(page, statement[1]);
	} else if (operator != "section" && operator != "endsection") {
		page.success = false;
	}

};


// Parses logic statement.
var processStatement = function (page, result) {

	var statement = result[1].trim().split(" ");

	if (statement.length == 2) {
		handleStatement(page, statement);
	} else {
		page.success = false;
	}

};


// Carries out logic statements in the template.
var processLogic = function (page) {

	var re = /\{\%([^%]+)\%\}/g;

	while ((result = re.exec(page.data)) && page.success === true) {

		processStatement(page, result);

	}

};
