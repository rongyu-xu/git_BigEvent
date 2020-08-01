$(function(){
    // 1.一上来就直接获取用户信息
    getUserInfo()
    // 封装获取用户信息的函数
    function getUserInfo () {
        $.ajax({            
            url:'/my/userinfo',
            // headers是jq中专门设置请求头信息的属性
            // herders:{
            //     Authorization:localStorage.getItem('token') || ''
            // },
            success:function(res){
                // console.log(res);
                if(res.status != 0) {
                    layui.layer.msg(res.message)
                }
                renderAvatar(res.data)
            }
        })
    }
    // 封装渲染用户头像的函数
    function renderAvatar (user) {
        // 1.渲染用户名
        var uname = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp' + uname);
        // 2.渲染用户头像
        // 判断用户头像信息，如果有就渲染图片，如果没有就渲染文字
        if(user.user_pic !== null){
            $('.layui-nav-img').show().attr('scr',user.user_pic)
            $('.text-avater').hide()
        }else{
            $('.layui-nav-img').hide()
            $('.text-avater').show().html(uname[0].toUpperCase())
        }
    }
    // 点击退出按钮，实现退出功能
    $('#btnLogout').on('click',function(){
        // 提示用户是否退出
        layui.layer.confirm('确定退出吗？',{icon:3,title:'提示'},function(){
            // 关闭提示框
            layui.layer.close(index);
            // 删除本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
        });
       

    })









})