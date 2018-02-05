
var _ = require("lodash");
var proxy = require("../mock/config_proxy/test/test.js");
// var localAllConfig = require("../mock/config_local/local_all_config");

/**
 * local : 本地
 * proxy : 代理
 * all   : 所有
 */
module.exports = {
	mockType : 'proxy',
	table :  _.extend({},
		proxy
		// localAllConfig
	)
};
