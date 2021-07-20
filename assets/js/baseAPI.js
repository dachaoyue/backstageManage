//进行url拼接
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //为有权限的接口统一设置headers请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
                Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂在complete 函数
    options.complete =  function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制清空localStorage
            localStorage.removeItem('token');

            //强制跳转登录界面
            location.href = '/login.html';
        }

    }
})

