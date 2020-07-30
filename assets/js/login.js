$(function(){
    // 点击切换登录和注册
    $('#login_box').on('click',function(){
        $('.login_box').hide()
        $('.reg_box').show()
        // $('.reg_box').find('input').eq(2).stop().fadeIn();
        
    })
    $('#reg_box').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 2.定义layui验证规则    
    var form = layui.form;  // 这个是引入layui的验证规则，其中有一个verify方法，
    var layer = layui.layer  // 拿到layer这个弹出框方法
    form.verify({           // 参数可以是数组，也可以是对象
        // 密码的校验规则
        pwd : [/^\S{6,12}$/,'密码必须是6~12位，并且不能有空格'],
        repwd : function(value){
            // console.log(value);
            
            if($('#ipt').val() !== value) {
                return "两次密码输入的不一致"
            }
        }
    })

    // 3.注册功能
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{
                username : $('#form_reg [name=username]').val(),
                password : $('#form_reg [name=password]').val()
            },
            success:function(res){
                if(res.status != 0){
                    layer.msg('用户名被占用，请重新输入')
                    return;
                }
                // alert(res.message)
                layer.msg(res.message)
                $('#reg_box').click()
                $('#form_reg')[0].reset()
            }   
            
        })
    })

    // 4.登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data: $(this).serialize(),    //快速获取表单数据    
            success:function(res){
                if(res.status != 0) {
                    layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功获取的token存放到本地存储中去
                localStorage.setItem('token',res.token);
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })
       

})