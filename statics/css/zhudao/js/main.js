window.onload = function(){
    resizeFour();
    $('.pics').responsiveSlides({// 轮播图
        auto:true,
        speed:800,
        timeout:4500,
        pager:true,
        after:function(){
            $('.dots .open')
        }
    });
    appendDots();
    navBar();
    detail();
    instance();
    update();
};

function resizeFour(){
    var windowW = $(window).width();
    $('#mainwrap').css({
        'left':windowW/2,
        'margin-left':'-150px'
    });
}
window.onresize = function(){
    resizeFour();
};

function appendDots(){
    var liNum = $('.pics li').length;
    console.log(liNum + '个');
    for (var i = 0; i < liNum ; i ++){
        var dot = $('<li>');
        $('.dots').append(dot);
    }
    $('.dots .open').on('click', function () {
        if ($(this).hasClass('open')){
            $('.more').css({'display':'block','height':0}).animate({
                'bottom':'44px',
                'height':'76px'
            },500);
            $('.pics .text').animate({
                'bottom':'120px'
            },500);
            $(this).addClass('close').removeClass('open');
        }
        else{
            $('.more').animate({
                'bottom':'0',
                'height':'0'
            },500);
            $('.pics .text').animate({
                'bottom':'44px'
            },500,function(){
                $('.more').hide();
            });
            $(this).addClass('open').removeClass('close');
        }
    });
}

function navBar(){
    $('#navBar li').hover(
        function(){
            $('#navBar li').css('width','46px');
            $(this).css('width','100px');
        },
        function(){
            $('#navBar li').css('width','46px');
            $('#navBar .on').css('width','100px');
        }
    );
    $('#navBar li').each(function(index){
        $(this).click(function () {
            $('#navBar li').removeClass('on');
            $(this).addClass('on');
            if (index!=0){
                console.log('不是首页的li');
                showDetails(index-1); // 显示内容区块
            }
            else{
                quitDetail(); // 显示首页 隐藏内容区块
            }
        });
    });
}

function onNavBar(num){
    $('#navBar li').removeClass('on').eq(num).addClass('on');
    $('#navBar li').css('width','46px');
    $('#navBar .on').css('width','100px');
}

function detail(){
    var windowW = $(window).width();
    $('#details .fourblock .text').css('width',windowW - 440 + 'px');
    $('#details .fourblock .wrap').css('width',windowW - 440 - 60 + 'px');
    $('.fourblock .hd_part li').each(function(index){
        $(this).click(function(){
            fourblock(index);
        })
    });
    $('#mainwrap li').each(function (index) {
        $(this).click(function(){
            showDetails(0);
            fourblock(index);
            onNavBar(1);
        })
    });
    //$('#pics .rslides1_on img').click(function(){
    //    showDetails(1);
    //});
    $('#pics .pics li').click(function(){
        quitDetail();
    });
    albums();
    quitalert();
    albumLi();
}

function fourblock(num){ // 关于 部分
    $('.fourblock .hd_part li').removeClass('on');
    $('.fourblock .hd_part li').eq(num).addClass('on');
    $('#mainwrap li').removeClass('on').eq(num).addClass('on');

    var liH = $('.fourblock .bd_part>li').outerHeight(true);
    $('.fourblock .bd_part>li').animate({
        'top':- liH * num
    },400);
}

function instance(){ // 案例 部分
    $('.instance .hd_part h6').each(function(index){ // 大分类
        $(this).click(function(){
            $('.instance .hd_part>li').removeClass('on');
            $('.instance .hd_part>li').eq(index).addClass('on');

            var liH = $('.instance .bd_part>li').outerHeight(true);
            $('.instance .bd_part>li').animate({
                'top':- liH * index
            },400);
        })
    });

    $('.instance .sub_title').each(function(i){ // 小分类 列表
        var piclistH = $('.bd_part .pic_list').outerHeight(true);
        $(this).find('li').each(function(j){
            $(this).click(function(){
                console.log('第'+i+'个大分类里的第'+j+'个小标题');
                $('.instance .hd_part .sub_title').eq(i).find('li').removeClass('on').eq(j).addClass('on');
                $('.instance .bd_part>li').eq(i).find('.pic_list').animate({
                    'top' : - piclistH * j
                },500)
            })
        })
    })
}

function update(){
    $('.update .hd_part li').each(function(index){ // 大分类
        $(this).click(function(){
            $('.update .hd_part>li').removeClass('on');
            $('.update .hd_part>li').eq(index).addClass('on');

            var liH = $('.update .bd_part>li').outerHeight(true);
            $('.update .bd_part>li').animate({
                'top':- liH * index
            },400);
        })
    });

}


function showDetails(index){
    if($('#details').height()==0){
        $('.rslides_tabs,.dots').animate({// 隐藏图片导航栏
            'height':0
        },300,function(){
            $('#details').animate({ // 显示details
                'height':'328px'
            },500,function(){ // 显示区块
                $('#details>div').removeClass('active').eq(index).addClass('active').slideDown(500,function(){
                    wrap(index);
                });
            });
        });
    }
    else{
        $('#details .active').slideUp(500,function(){
            $('#details>div').removeClass('active').eq(index).addClass('active').slideDown(500,function(){
                wrap(index);
            });
        });
    }
    if (index!=0){
        $('#mainwrap li').removeClass('on');
    }
}

function quitDetail(){
    if ($('#details').height()!=0){
        $('#details .active').slideUp(500,function(){
            $('#details').animate({
                'height':0
            },400,function(){
                $('.rslides_tabs,.dots').animate({
                    'height':'44px'
                })
            })
        })
    }
}

function wrap(index){
    if (index==0){
        $('.fourblock .bd_part .text').each(function(index){
            var innerW = $(this).find('.inner').outerWidth();// inner宽度
            var wrapW = $(this).find('.wrap').width();// wrap宽度
            if (innerW>wrapW){
                $(this).find('button').fadeIn();
            }
            else{
                $(this).find('button').fadeOut();
            }
            buttons();
        })
    }
}

function buttons(){
    var temp = [];
    $('.fourblock .bd_part .text').each(function(index){
        temp[index] = 0;
        var innerW = $(this).find('.inner').outerWidth();// inner宽度
        var wrapW = $(this).find('.wrap').width();// wrap宽度
        var timer;
        $(this).find('.prevButton').hover(
            function(){
                console.log('next');
                timer = setInterval(function(){
                    console.log(temp[index]);
                    if (temp[index]<0){
                        temp[index] += 2;
                        $('.fourblock .bd_part .text').eq(index).find('.inside').css({
                            'left':temp[index]
                        });
                    }
                },20);
            },
            function(){
                clearInterval(timer);
            }
        );
        $(this).find('.nextButton').hover(
            function(){
                console.log('next');
                timer = setInterval(function(){
                    console.log(temp[index]);
                    if (-temp[index] < innerW - wrapW){
                        temp[index] -= 2;
                        $('.fourblock .bd_part .text').eq(index).find('.inside').css({
                            'left':temp[index]
                        });
                    }
                },20);

            },
            function(){
                clearInterval(timer);
            }
        )
    })
}

function alertList(n){
    $('.alert').eq(n).animate({
        'bottom':0
    },600)
}

function albums(){
    $('.instance .pic').each(function(mmm){
        $(this).click(function(){
            alertList(0); // 弹出第几个相册
        });
    });
    $('.update li>div').each(function(mmm){
        $(this).click(function(){
            alertList(0); // 弹出第几个相册
        });
    });
}

function quitalert(){
    $('.alert .quit').each(function(){
        $(this).click(function(){
            var winH = document.body.clientHeight;
            $(this).parent('.alert').animate({
                'bottom':winH
            },600);
        })
    })
}

function albumLi(){
    var winW = document.body.clientWidth;
    var winH = document.body.clientHeight;
    var liW = $('.alert .lists li').width();
    var liH = $('.alert .lists li').height();
    $('.alert .lists ul li').css({
        'margin-left':(winW - liW)/2,
        'margin-top':(winH - liH)/2
    });
    $('.alert button').css({
        'top':(winH - 50)/2
    });
    var tempL = [];
    $('.alert').each(function(index){
        var totalPic = $(this).find('li').length; // 照片总数
        $(this).find('.total').html(totalPic);

        tempL[index] = 0; // 存储向左的距离
        var alert = $(this); // 存储alert
        var WWW = liW + (winW - liW)/2;// 每次偏移的距离
        $(this).find('.prevPic').on('click',function(){
            if (tempL[index]<0){
                tempL[index]+=WWW;
                alert.find('ul').animate({
                    'left':tempL[index] + 'px'
                },500);
                console.log(tempL[index]);
                alert.find('.now').html(parseInt(alert.find('.now').html())-1);
            }
        });
        $(this).find('.nextPic').on('click',function(){
            if (alert.find('.now').html() < totalPic){
                tempL[index]-=WWW;
                alert.find('ul').animate({
                    'left':tempL[index] + 'px'
                },500);
                console.log(tempL[index]);
                alert.find('.now').html(parseInt(alert.find('.now').html())+1);
            }
        })
    })
}
