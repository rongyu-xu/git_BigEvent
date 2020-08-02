$(function(){
    var form = layui.form;
    var layer = layui.layer;
    //定义检验规则
    form.verify({
        nickname : function(value) {
            if(value.length > 6) {
                return "昵称不能长于6个字符"
            }
        }
    })
    // console.log(123);
    initUserInfo() 
    function initUserInfo () {
        $.ajax({
            
            url:'/my/userinfo',

            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 展示用户信息
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 3.重置
    $('#btnReset').on('click',function(e){
        // 取消浏览器的默认重置操作行为（取消清空表单功能）
        e.preventDefault();
        initUserInfo()
    })
    // 4.提交用户修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                }else{
                    layer.msg('修改成功')
                    // 刷新父框架里面的用户信息
                    window.parent.getUserInfo()
                }
            }
        })
    })
})