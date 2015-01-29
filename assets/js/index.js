//= include '../../bower_components/jquery/dist/jquery.min.js'
//= include '../../bower_components/typed.js/js/typed.js'
$(document).on("secondOnload", function () {
    console.log('handled');
    $("#typed").typed({
        strings: ["Hey Guys! This is <em>raabbajam</em>.<br>And you are reading my <em>bgggraphy</em>.<br>Enjoy!"],
        typeSpeed: 34,
        backDelay: 500,
        loop: true,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: 3,
    });
});
