'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	DIR_NAME: '"/"',
	API_ROOT: '"http://apis.dev.bandins.com/"', 
	 HAPI_ROOT:'"http://dev-apis.bandins.cn"',
	// DOMAIN: '"elongai"',
	// CORP_NAME: '"东风南方保险代理有限公司"',
	// SITE_NAME: '"易龙车险开发者平台"',
	
	DOMAIN: '"bandins"',
	CORP_NAME: '"深圳市邦德布拉泽科技有限公司"',
	SITE_NAME: '"邦德车险开发者平台"',
})
