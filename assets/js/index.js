//= include '../../bower_components/jquery/dist/jquery.min.js'
//= include '../../bower_components/typed.js/js/typed.js'
//= include '../../bower_components/gsap/src/minified/TweenLite.min.js'
//= include '../../bower_components/gsap/src/minified/easing/EasePack.min.js'
//= include '../../bower_components/rAF/index.js'
//= include '../../bower_components/slabText/js/jquery.slabtext.min.js'


$(document)
	.on("secondOnload", function() {
		$("#typed")
			.typed({
				strings: ["Hey Guys! This is <em>raabbajam</em>.<br>And you are reading my <em>bgggraphy</em>.<br>Enjoy!"],
				typeSpeed: 34,
				backDelay: 500,
				loop: true,
				contentType: 'html', // or text
				// defaults to false for infinite loop
				loopCount: 3,
			});
		//= include 'header.js'
		//= include 'timeline.js'
        slabTextHeadlines();
		function slabTextHeadlines() {
			var parents = $('#hobby, #family, #goal, #experience, #skill, #contact');
			var texts = parents.find('ul > li');
			texts.slabText({
				// Don't slabtext the headers if the viewport is under 380px
				"viewportBreakpoint": 380
			});
		}
	});
