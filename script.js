var $discord_join_button = $("#discord-join-button");
var navigationOpenFlag = false;
var navButtonFlag = true;
var focusFlag = false;
/** {min}以上{max}未満の乱数を返す関数 */
function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

//jQueeey
$(function() {
    $("#title-img").fadeIn(2700);
    $("#title-img").css('transform', 'translateY(0%)');
    $("#icon").fadeIn(1500);
    $("#icon").css("transform", "rotateY(0deg)");
    $("#icon").css("display", "block");
});

$(function() {
    $("#top_move").on('click touchstart', function () {
        $('html,body').animate({
             scrollTop: 0 
            }, 'swing');
        return false;
    });
});

$(function() {
  $("#langEnglish").click(function(){
    location.href = 'https://translate.google.com/translate?hl=&sl=ja&tl=en&u=' + location.href;
  });
});


// ▼ メニュー ▼
$(function(){
  $('#koreMenu').append(`
    <span class="menu-red"><li><a href="index.html">Home|ホーム</a></li></span>
    <span class="menu-yellow"><li><a href="creation.html">Creation|創作物</a></li></span>
    <span class="menu-green"><li><a href="social.html">Social|お問合せ等</a></li></span>
    <span class="menu-blue"><li><a href="#">---</a></li></span>
    <span class="menu-purple"><li><a href="#">---</a></li></span>
    <span class="menu-orange"><li><a href="#">---</a></li></span>
    <span class="menu-indigo"><li><a href="404.html">404 Page not found</a></li></span>
  `);
});
// ▲ メニュー ▲

//header title
window.onload = function() {//読み込み終わったら実行
  var headerTitle_img = document.getElementById('title-img');
  headerTitle_img.style.filter = 'hue-rotate(' + randomValue(0, 361) + 'deg)';
}

// ▼ homeの挨拶文 ▼
function greeting() {
  var nowDate = new Date();
  var nowHou = nowDate.getHours();
  if( nowHou <= 0 ) { 
    document.write('昨日は もラ おわて レまたてず'); 
  }else if( nowHou <= 2 ) { 
    document.write('死は おたても暗いゐてず'); 
  }else if( nowHou <= 3 ) { 
    document.write('おやつてずカ? 违ったてずカ'); 
  }else if( nowHou <= 4 ) { 
    document.write('おひさま あった力ㄑなゑてず!1!1'); 
  }else if( nowHou <= 5 ) { 
    document.write('おはやラ ごじまず!!'); 
  }else if( nowHou <= 8 ) {
    document.write('朝ご饭は 何てせラカ¿'); 
  }else if( nowHou <= 10 ) {
    document.write('こんにちは てずてず'); 
  }else if( nowHou <= 11 ) { 
    document.write('お昼ラソチ なんてずカな?¿?'); 
  }else if( nowHou <= 15 ) { 
    document.write('おやつ 分けて下さい なゐてず!1!1'); 
  }else if( nowHou <= 17 ) { 
    document.write('夕日が 眩ぢいてず'); 
  }else if( nowHou <= 18 ) { 
    document.write('こんばんワソタソ麺 てずてず!1!1'); 
  }else if( nowHou <= 20 ) { 
    document.write('夜ご饭 お外てせラカ?'); 
  }else if( nowHou <= 22 ) { 
    document.write('おやずみ!1!1'); 
  }else if( nowHou <= 23 ) { 
    document.write('おばけが 出たら 逃げゑゐてず!1!1'); 
  }
}
// ▲ homeの挨拶文 ▲

/******その他******/

/* ▼ ハンバーガー*/
$(function() {
  $('.nav-toggle').click(function(){
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.header-menu').addClass('active');
    } 
    else {
      $('.header-menu').removeClass('active');
    }
  });
});
/* ▲ ハンバーガー */