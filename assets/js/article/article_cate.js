$(function () {
  initArtCateList();
  //获取文章列表
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取文章列表失败");
        }

        var htmlStr = template("tpl-table", res);

        $("#art_cateTable").html(htmlStr);
      },
    });
  }

  var indexAdd = null;
  //为添加类别按钮绑定点击事件
  $("#btnAddCate").on("click", function () {
    indexAdd = layui.layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加类别",
      content: $("#dialog-add").html(),
    });
  });

  //通过代理的方式为form绑定submit事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("添加文章分类失败");
        }
        initArtCateList();
        layui.layer.msg("添加文章分类成功");
        layui.layer.close(indexAdd);
      },
    });
  });

  var indexEdit = null;
  //为编辑按钮绑定点击事件
  $("body").on("click", "#btnAddEdit", function () {
    indexEdit = layui.layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加类别",
      content: $("#dialog-edit").html(),
    });

    var id = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        layui.form.val("form-edit", res.data);
        console.log(res);
      },
    });
    //通过代理的方式为form绑定submit事件
    $("body").on("submit", "#form-edit", function (e) {
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg("更新文章分类失败");
          }
          layui.layer.msg("更新文章分类成功");
          layui.layer.close(indexEdit);
          initArtCateList()
        },
      });
    });
  });

  //提示用户是否删除
  $('body').on('click', '.btn-del', function() {
    var id = $(this).attr('data-Id');
    layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('删除文章类别失败');
                }
    
                layui.layer.msg('删除文章类别成功');
                layui.layer.close(index);
                initArtCateList();
            }
        })
        
      });
    
  })
});
