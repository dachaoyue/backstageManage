$(function() {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          samePwd: function(value) {
              if(value === $('#oldPwd').val()) {
                  return '两次密码不能一致';
              }
          },
          reNewPwd: function(value) {
            if(value !== $('#newPwd').val()) {
                // console.log('buok');
                return '两次密码不一致';
            }
            // console.log('ok');
          }
    })

    //发起ajax请求重制密码
    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !==0) {
                    return layui.layer.msg('密码重置失败');
                }

                layui.layer.msg('密码重置成功');

                $('.layui-form')[0].reset();
            }
        })
    })
})