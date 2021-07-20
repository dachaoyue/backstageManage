$(function() {

    //点击 去注册账号 按钮 切换至注册模块
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击 去登录 按钮 切换至登录模块
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;

    //通过form.verify函数自定义校验规则
    form.verify({
        //密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          //校验两次密码一致
          repwd: function(value) {
              var pwd = $('#reg-password').val();

              if(pwd !== value) {
                  return '两次密码不一致';
              }
          }
    })

    //监听注册表单提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser',{username: $('#reg-username').val(),password: $('#reg-password').val()}, function(res) {
            if(res.status !== 0) {
                // return console.log(res.message);
                layer.msg(res.message);
            }else{
                // console.log('注册成功');
                layer.msg('注册成功! 请登录');

                //注册成功后跳转至登录模块
                $('#link_login').click();
            }

           
        })
    })

    //监听登录表单提交事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('密码或用户名错误');
                }else {
                    layer.msg('登录成功');
                    //将登录成功的token存在localstorage中
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        })
    })
})