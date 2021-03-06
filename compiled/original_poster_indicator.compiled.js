"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Original_Poster_Indicator = function () {
	function Original_Poster_Indicator() {
		_classCallCheck(this, Original_Poster_Indicator);
	}

	_createClass(Original_Poster_Indicator, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pd_original_poster_indicator";
			this.icon = null;
			this.route = pb.data("route");
			this.page = pb.data("page");
			this.created_by = 0;

			this.setup();

			if (this.route && this.route.name == "thread" && this.page && this.page.thread) {
				this.created_by = parseInt(this.page.thread.created_by, 10);

				if (this.created_by > 0) {
					$(this.ready.bind(this));
				}
			}
		}
	}, {
		key: "ready",
		value: function ready() {
			this.add_icon();
			proboards.on("afterSearch", this.add_icon.bind(this));
		}
	}, {
		key: "add_icon",
		value: function add_icon() {
			var _this = this;

			$(".mini-profile").each(function (i, elem) {
				var $mini = $(elem);
				var poster_id = parseInt($mini.find("a.user-link").attr("data-id"), 10);

				if (poster_id == _this.created_by) {
					$mini.css("position", "relative");
					$mini.append("<img class='original-poster-indicator' src='" + _this.icon + "' title='Original Poster' alt='Original Poster' />");
				}
			});
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.images) {
				this.icon = plugin.images.tick;
			}
		}
	}]);

	return Original_Poster_Indicator;
}();


Original_Poster_Indicator.init();