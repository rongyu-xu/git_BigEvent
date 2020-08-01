// 拦截/过滤每次ajax请求，配置每次请求根路径
var base = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(options){
    // 1.拼接路径    
    options.url = base + options.url;
    // 2.判断、请求路径是否包含 /my/
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization : localStorage.getItem('token') || ''
        }
    }
    // 3.所有的请求完成后都要进行身份认证判断：
    options.complete = function(res){
        var data = res.responseJSON;
        if(data.status == 1 && data.message == '身份认证失败'){
            // 1.删除token
            localStorage.removeItem('token');
            // 2.页面跳转   
            location.href = '/login.html'
        }
    }
})

