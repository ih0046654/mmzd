/**
 * 登陆的view
 */
define([ 'jquery', 'underscore', 'backbone', 'text!../../views/templates/pd.html' ], function($, _, Backbone, pdTemplate) {
	var PWView = Backbone.View.extend({
		el : '#passwordContent',
		template : _.template(pdTemplate),
		initialize : function(mainModel) {
			if (Common.isEmpty(mainModel)) {
				mainModel = new MainModel();
			}
			var _this = this;
			_this.mainModel = mainModel;
			_this.render();
		},
		// 定义如何显示DOM元素
		render : function(validate) {
			var _this = this;
			_this.$el.empty();
			// 获取模板
			var stepHtml = _this.template(_this.mainModel.toJSON());
			// 一般使用模板
			$(_this.el).html(stepHtml).ready(function() {
				// 设置焦点
				var userDom = $(_this.el).find(".ia_class_user");
				var pwdDom = $(_this.el).find(".ia_class_password");
				var mobile = _this.mainModel.get("mobile");
				if (Common.isEmpty(mobile)) {
					userDom.focus();
				} else {
					pwdDom.focus();
				}
				// 设置下载二维码
				_this.initJsHtml(_this);

				if (!('placeholder' in document.createElement('input'))) { // 判断浏览器是否支持
					$('[placeholder]').focus(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
							input.removeClass('placeholder');
							$(".ia_class_password").attr("type","password");
						}
					}).blur(function() {
						var input = $(this);
						if (input.val() == '' || input.val() == input.attr('placeholder')) {
							input.addClass('placeholder');
							$(".ia_class_password").attr("type","ie_password");
							input.val(input.attr('placeholder'));
						}
					}).blur();
				}
			});
		},
		initJsHtml : function(_this) {
			$(_this.el).find(".ia_class_panel[ia_data='2'] .android").qrcode({
				text : Common.getConfig("downAndroidApp_url"),
				width : 120,
				height : 120,
			});
			$(_this.el).find(".ia_class_panel[ia_data='2'] .ios").qrcode({
				text : Common.getConfig("downIosApp_url"),
				width : 120,
				height : 120,
			});
		},
		// 控件绑定事件
		events : {
			"click .ia_class_login" : "loginAction",
			"keydown .ia_class_password" : "loginKeyDownAction",
			"click .ia_class_download" : "openQrcodeAction",
			"click .ia_class_backfrom" : "openQrcodeAction",
			"click .ia_class_download canvas" : "openUrlAction",
		},
		openQrcodeAction : function(event) {
			var _this = this;
			var dom = $(event.target);
			var type = dom.attr("ia_data");
			// 
			var actionPanel = $(_this.el).find(".ia_class_panel_action[ia_data='" + type + "']");
			actionPanel.addClass("hide");
			actionPanel.siblings().removeClass("hide");
			// 
			var panle = $(_this.el).find(".ia_class_panel[ia_data='" + type + "']");
			panle.addClass("hide");
			panle.siblings(".ia_class_panel").removeClass("hide");
		},
		openUrlAction : function(event) {
			var _this = this;
			var dom = $(event.target);
			var type = dom.parent(".ia_class_download").attr("ia_data");
			if (type == 2) {
				window.open(Common.getConfig("downAndroidApp_url"));
			} else {
				window.open(Common.getConfig("downIosApp_url"));
			}
		},
		loginKeyDownAction : function(event) {
			if (event.keyCode == 13) {
				this.loginAction(event);
			}
		},
		loginAction : function(event) {
			var _this = this;
			// 判断是否登陆中
			var loginDom = $(_this.el).find("button.ia_class_login");
			// 判断空
			var userDom = $(_this.el).find(".ia_class_user");
			var pwdDom = $(_this.el).find(".ia_class_password");
			var thisUser = userDom.val();
			var thisPwd = pwdDom.val();
			if (Common.isEmpty(thisUser)) {
				userDom.focus();
				return alert("请输入登录名！");
			}
			if (Common.isEmpty(thisPwd)) {
				pwdDom.focus();
				return alert("请输入密码！");
			}
			// 改变登陆框样式
			var result = $.base64.encode(thisPwd);
			// 登录请求
			$.ajax({
				loadingDom : loginDom,
				loadingClass : "logining",
				checkToken : false,
				crossDomain : true,
				url : Common.getUrl("user/passwordLogin.do"),
				data : Common.getParams({
					token : "",
					loginNo : thisUser,
					password : result,
					osVersion : "pc",
					appVersion : Common.getConfig("appVersion"),
					clientType : "2"
				}),
				success : function(data) {
					// 从服务器得到数据，显示数据并继续查询  
					if (Common.isEmpty(data.object)) {
						if (Common.isEmpty(data.message)) {
							alert("输入用户不正确或者密码不正确!");
						} else {
							alert(data.message);
						}
					} else {
						Common.saveUserInfo(data.object);
						$.ajax({
							type : 'post',
							dataType : 'json',
							async : false,
							url : Common.getUrl("simulationComb/getSimulationCombIndex.do"),
							data : Common.getParams({}),
							success : function(ret) {
								_.each(ret.data, function(indexData, index) {
									if (indexData.lb == 2) {
										Common.setCookie('zdysy', indexData.value);
									}
								});
							},
						});
						location.href = "index.html";
					}
				},
				// Ajax请求超时，继续查询  
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("服务器开小差了，请重新登录~");
				}
			});
		}
	});
	return PWView;
});