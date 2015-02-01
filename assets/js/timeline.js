(function() {
    var $tl = $('#timeline');
    var lists = $('ul > li', $tl);
    console.log('lists', lists);
    lists.hover(function () {
        console.log('enter');
        $(this).addClass('active');
    }, function () {
        console.log('out');
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            $(this).removeClass('active');
        });
    });
}());
