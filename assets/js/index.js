$(function() {
    //调用getUserInfo函数获取用户基本信息
    getUserInfo();

    //退出登录
    $('#closeBtn').on('click' ,function() {
        //提示是否确认退出
        layui.layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //清空本地存储的localStorage
            localStorage.removeItem('token');

            //跳转至登录界面
            location.href = '/login.html';
            
            layer.close(index);
        })
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',

        //在baseAPI中进行了统一设置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //调用此函数渲染用户头像
            renderAvatter(res.data);
        }
    })
}

//渲染用户头像
function renderAvatter(data) {
    //获取用户名称
    var name = data.nickname || data.username;

    $('.welcome').html('欢迎&nbsp;' + name);

    //渲染头像
    if(data.user_pic !== null) {
        $('.layui-nav-img').attr('src',data. user_pic).show();
        $('.text-avater').hide();
    }else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avater').html(first).show();
    }
}