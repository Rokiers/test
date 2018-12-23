/* by:Yangyunhe——David Yang
***阴阳师轮播图插件
***插件支持轮播所需图片数量为至少为四张
***在调用该插件时传入图片数量
*/
(function ($) {
    $.fn.gallery_slider = function (options) {
        var _ops = $.extend({
            imgNum: 5, //图片数量
            gallery_item_left: '.prev', //左侧按钮
            gallery_item_right: '.next', //右侧按钮
            gallery_left_middle: '.gallery_left_middle', //左侧图片容器
            gallery_right_middle: '.gallery_right_middle', //左侧图片容器
            threeD_gallery_item: '.threeD_gallery_item', //图片容器
            front_side: '.front_side', //放大中间图片容器
        }, options);
        var _this = $(this),
            _imgNum = _ops.imgNum, //图片数量
            _gallery_item_left = _ops.gallery_item_left, //左侧按钮
            _gallery_item_right = _ops.gallery_item_right, //右侧按钮
            _gallery_left_middle = _ops.gallery_left_middle, //左侧图片容器
            _gallery_right_middle = _ops.gallery_right_middle, //左侧图片容器
            _threeD_gallery_item = _ops.threeD_gallery_item, //图片容器
            _front_side = _ops.front_side;
        //初始化图片
        var position; //数组计数器
        var rl = 2;       //来回点击计数
        $.ajax({
            url: "test.php",
            type: "POST",
            data: "start=on",
            dataType: "json",
            cache: false,
            success: function (data) {
                _this.find(".front_side").find("img").attr("src", data[0]);
                _this.find(".gallery_left_middle").find("img").attr("src", data[1]);
                _this.find(".gallery_right_middle").find("img").attr("src", data[2]);
                position = data[3];
            }
        });

        var _all = [];
        $.ajax({
            url:"test.php",
            type:"POST",
            data:"info=all",
            dataType: "json",
            cache: false,
            success:function (data) {
                _all = data;
            }
        });
        //图片放大函数
        jQuery.fn.clickToBig = function(){
            //ajax请求  弹幕内容和数组
            var _content = [];
             $.ajax({
                url:"content.php",
                type:"POST",
                data:"imgSrc="+this.attr("src")+"",
                cache:false,
                dataType:"json",
                success:function (data) {
                        var num = data[0];
                        var colText = setInterval(function () {
                        var text = data[num];
                        var Height = $("#bigImg").height();
                        var Width =  $("#bigImg").width();
                        var content = $("<span class='onlySpan'></span>");
                        content.text(text);
                        var set = $("#bigImg").offset();
                        $("#opacityBottom").append(content);
                        Top = parseInt(Height*(Math.random()));
                        content.css({
                            left:set.left+Width,
                            top:Top+set.top,
                        });
                        content.animate({
                            left:set.left-200,
                        },10000,"linear",function () {
                            $(this).remove();
                        });
                        var cont = "<tr><td>"+text+"</td></tr>";
                        $("#contList").append(cont);
                        if (num == 1){
                            clearInterval(colText);
                        }
                        num-=1;
                    },1000);
                }
            });

            function clickToSmallImg() {
                $("html,body").removeClass("none-scroll");
                $("#opacityBottom").remove();
                $("#contList").empty();
            }
            var nead_width = (this.outerWidth(true)/$("body").outerWidth(true))*130;  //比例
            var imgsrc = this.attr("src");
            var opacityBottom = '<div id="opacityBottom" style="display: none"><div id="imgBox" ><img class="bigImg" id="bigImg" src="'+imgsrc+'"></div></div>';
                $(document.body).append(opacityBottom);
                $("#opacityBottom").addClass('opacityBottom');
                $("#opacityBottom").show();
                $("html,body").addClass('none-scroll');
                $(".bigImg").addClass('bigImg');
                $(".bigImg").attr('width',nead_width+'%');
                $(".bigImg").attr('style','left:'+(100-nead_width)/2+'%');
                $("#opacityBottom").bind("click",function () {
                    clickToSmallImg();
                    $("#inputbox").hide();
                    $("#showSiderbar").hide();
                });
                $("#Switch").bind("click",function () {
                    $("#showSiderbar").show();
                });
                $("#inputbox").show();
                $("#down").bind("click",function () {
                    $("#showSiderbar").hide();
                });
            $("#sentContent").click(function () {
                var text = $("#text").val();
                $.ajax({
                    url:"load.php",
                    type:"POST",
                    cache:false,
                    data:"imgSrc="+imgsrc+"&content="+text,
                });

                var Height = $("#bigImg").height();
                var Width =  $("#bigImg").width();
                var content = $("<span class='onlySpan'></span>");
                content.text(text);
                $("#text").val("");
                var set = $("#bigImg").offset();
                $("#opacityBottom").append(content);
                Top = parseInt(Height*(Math.random()));
                content.css({
                    left:set.left+Width,
                    top:Top+set.top,
                });
                content.animate({
                    left:set.left-200,
                },100000,"linear",function () {
                    $(this).remove();
                });
                //以上为弹幕内容
                //下面是列表
                var cont = "<tr><td>"+text+"</td></tr>";
                $("#contList").append(cont);
            });
        };
        //左侧按钮绑定点击事件
        _this.find(_gallery_item_left).on('click', function () {
            if(_all[position-1] == null){
                alert("这是第一张图片,");
            }else {
                if (rl == 1){position-=3;}else{position-=1;}
                rl = 0;
                var idx = parseInt(_this.find(_gallery_left_middle).index());
                //当前展示图片逻辑
                _this.find(_threeD_gallery_item).eq(idx).removeClass('gallery_left_middle').addClass('front_side');
                //当idx值为0时，执行逻辑  //判断改变outimg的src地址l
                _this.find(_threeD_gallery_item).eq(idx == 0 ? idx + _imgNum - 1 : idx - 1).removeClass('gallery_out').addClass('gallery_left_middle').find("img").attr("src",_all[position]);
                //当idx值为_imgNum - 3时，执行逻辑
                _this.find(_threeD_gallery_item).eq(idx == _imgNum - 3 ? idx + 2 : idx - _imgNum + 2).removeClass('gallery_right_middle').addClass('gallery_out');
                //当idx值为_imgNum - 2时，执行逻辑
                _this.find(_threeD_gallery_item).eq(idx == _imgNum - 2 ? idx + 1 : idx - _imgNum + 1).removeClass('front_side').addClass('gallery_right_middle');

            }
        });

        //右侧按钮绑定点击事件
        _this.find(_gallery_item_right).on('click', function () {
            if (_all[position+1] == null) {
                alert("这是最后一张图片");
            } else {
                if (rl == 0){position+=3;}else{position+=1;}
                rl = 1;
                var idx = parseInt(_this.find(_gallery_right_middle).index());
                //当前展示图片逻辑
                _this.find(_threeD_gallery_item).eq(idx).removeClass('gallery_right_middle').addClass('front_side');
                //当idx值为0时，执行逻辑
                _this.find(_threeD_gallery_item).eq(idx == 0 ? idx + _imgNum - 1 : idx - 1).removeClass('front_side').addClass('gallery_left_middle');
                //当idx值为1时，执行逻辑
                _this.find(_threeD_gallery_item).eq(idx == 1 ? idx + _imgNum - 2 : idx - 2).removeClass('gallery_left_middle').addClass('gallery_out');
                //当idx值为_imgNum - 2时，执行逻辑  //改变outimg的src地址
                _this.find(_threeD_gallery_item).eq(idx == _imgNum - 2 ? idx + 1 : idx - _imgNum + 1).removeClass('gallery_out').addClass('gallery_right_middle').find("img").attr("src",_all[position]);

            }

        });
//中间添加点击放大事件，添加一个可点击的放大按钮
        _this.find(_threeD_gallery_item).on('click', function () {
            var idx = parseInt(_this.find(_front_side).index());
            _this.find(_threeD_gallery_item).eq(idx).find("img").clickToBig();
        })
    }
    ;
})
(jQuery);