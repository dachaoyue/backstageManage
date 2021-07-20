$(function() {
    var form = layui.form;

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称必须小于六位';
            }
        }
    })

    initUserInfo();
    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败');
                }
                //快速为表单赋值
                form.val('UserInfoForm', res.data);
            }
        })
    }

    //重置表单元素
    $('#resetBtn').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0){
                    return layui.layer.msg('更新用户信息失败');
                }

                layui.layer.msg('用户信息更新成功');

                //调用父页面的方法重新渲染用户头像
                window.parent.getUserInfo();
            }
        })
    })
})