$(function() {
    //定义一个参数查询对象
    var q = {
        pagenum: 1,
        pagesize: 4,
        cate_id: '',
        state: ''
    }

    initList();
    //获取文章列表
    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    layui.layer.msg('获取文章列表失败')
                }
               
                layui.layer.msg('获取文章列表成功')

                var htmlStr = template('tpl-artList',res);
                $('tbody').html(htmlStr);
            }
        })
    }
})