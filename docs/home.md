# Node Framework - Documentation

An attempt to develop a full web backend using Node.js, comprised of the following:

* Web server - capable of serving pages and static files.
* Template engine - simple rendering of pages upon request.
* Database interface - supports SQLite3.
* URL routing - separates out url patterns from site structure.

## Structure

### The Server Source Code

This is responsible for running the server, and in production would not ideally be visible to the person creating the site, but rather would be stored somewhere in a node package. It is contained within the `server` directory, and consists of the following files:

* database.js - responsible for handling database connections and running queries.
* response.js - contains a set of functions that generate http responses based upon the needs of the website builder.
* server.js - the nuts and bolts of the web server, handles client requests and determines appropriate responses.
* template.js - the template engine.

The remainder of the source code is meant to be user-facing (for website designers), and consists of the following files:

* run.js - used to launch the server, and set the port to listen on.
* config.json - a set of server configuration options stored in JSON format.
* urls.js - for URL routing, builds an object in which URL patterns are defined and connected to corresponding views.
* views.js - the set of user-designed functions used to perform actions when a request is received, such as rendering and returning a template.

### Templates

User-designed templates, stored in the `templates` directory. The syntax for these is based upon that used in a number of Python template engines, such as Django and Jinja2. Currently two major features have been implemented, inheritance and variables.

Inheritance involves taking a parent template and filling certain predefined sections within it with the contents of one or more child templates. It is commonly used to reduce the amount of boilerplate that must be written into each page, like the DOCTYPE, navbar and so on, by placing it once in a base, parent template. Various pages in the site then simply extend this base template and get all of this boilerplate for free. This is performed through the `{% extends 'parent.html' %}` tag, and the sections are defined by the `{% section <section_name> %}Section content.{% endsection <section_name> %}` tags.

Variables are a way of inserting data into templates at the time of rendering. So, for example, on a blog site you could have a generic article template and then insert the content for a specific article at the time the user asks for it. Variables are defined in view functions, possibly through querying a database, and passed to the template engine. In the template they are defined using the `{{ <variable_name> }}` tag, which will be replaced with the contents of the variable during rendering.

### Static Files

Static files may be served directly by the framework, or by a web server such as Nginx running in front of the framework. They are stored within the `static` directory. The server knows to look for a static file through a user-defined URL prefix, which defaults to `/static/`.

## Third Party Software

So far, the only third party package used is node-sqlite3, simply because building a full set of database bindings would have required an excessive amount of work relative to the scale of this project. This package may be found on Github [here](https://github.com/mapbox/node-sqlite3), and on the npm site [here](https://www.npmjs.com/package/sqlite3).

## Future Plans

* Expanding the template engine to include control logic statements, like loops and conditionals.
* Adding regular expressions and variable capture to the URL routing components.
