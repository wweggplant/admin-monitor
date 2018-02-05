/*
 * 代理服务器mock（测试）
 */

module.exports = {

    /************** proxy *******************/
    // http://114.55.138.53:9000/agent/
    /*'^https://api.map.baidu.com/!**!/!*' : {
        target: '',
        changeOrigin: true,
    },*/
    "/pm/**": {
        type: 'proxy',
        target: 'http://localhost:8088/',
        headers : {
            'X-Real-IP' : '127.0.0.1'
        },
        changeOrigin: true,
    },


};
