// 拦截/过滤每次ajax请求，配置每次请求根路径
var base = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(options){
    options.url = base + options.url
})