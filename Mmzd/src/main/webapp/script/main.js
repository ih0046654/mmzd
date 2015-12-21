/**
 * RequireJS启动配置
 */
require.config({
	/**
	 * 启动时的加载顺序
	 */
	shim : {
		"backbone" : {
			deps : [ "underscore", "jquery" ],
			init: function () { Backbone.$ = $; return Backbone; }
		},
		"bootstrap" : {
			deps : [ "jquery" ]
		},
	},
	/**
	 * 引用包的简称
	 */
	paths : {
		"jquery" : "../rely/jquery/jquery-1.11.2",
		"bootstrap" : "../rely/bootstrap/js/bootstrap",
		"underscore" : "../rely/backbone/underscore",
		"backbone" : "../rely/backbone/backbone",
		"text" : "../rely/requireJS/text",
		"domReady" : "../rely/requireJS/domReady",
		"jquery_confirm" : "../rely/jquery/jquery-confirm",
	},
});

require(['views/password']
	,function(password) {
	new password();
});
