!function(){var n=$("#timeline"),i=$("ul > li",n);console.log("lists",i),i.hover(function(){console.log("enter"),$(this).addClass("active")},function(){console.log("out"),$(this).one("webkitAnimationEnd oanimationend msAnimationEnd animationend",function(){$(this).removeClass("active")})})}();