$(function(){
    var form = layui.form;
    // 自定义form检验规则
    form.verify({
        // 密码长度
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 新密码不能与旧密码一致
        samePwd : function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不不能与旧密码一致'
            }
        },
        // 密码二次验证
        rePwd : function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入的密码不一致'
            }
        }
    })
})