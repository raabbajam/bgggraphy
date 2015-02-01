//= include '../../bower_components/PreloadJS/lib/preloadjs-0.6.0.min.js'
//= include '../../bower_components/snap.svg/dist/snap.svg-min.js'
//= include '../../bower_components/countUp.js/countUp.min.js'
//= include '../../bower_components/PageLoadingEffects/js/classie.js'
//= include '../../bower_components/PageLoadingEffects/js/svgLoader.js'
(function() {
	function onLoad() {
		classie.add(document.body, 'loading');
		var files = [
			"dists/css/index.css",
			"dists/js/index.js", {
				id: 'man',
				src: "dists/images/man.svg"
			}, {
				id: 'image1',
				src: "dists/images/image1.jpg"
			}, {
				id: 'logo',
				src: "dists/images/logo.svg"
			}, {
				id: 'profilbg',
				src: "dists/images/profilbg.png"
			}, {
				id: 'profile1',
				src: "dists/images/profil1.svg"
			}, {
				id: 'profile2',
				src: "dists/images/profil2.svg"
			}, {
				id: 'profile3',
				src: "dists/images/profil3.svg"
			}, {
				id: 'profile4',
				src: "dists/images/profil4.svg"
			}, {
				id: 'profile5',
				src: "dists/images/profil5.svg"
			}, {
				id: 'profile6',
				src: "dists/images/profil6.svg"
			}, {
				id: 'timeline1',
				src: "dists/images/timeline1.svg"
			}, {
				id: 'timeline2',
				src: "dists/images/timeline2.svg"
			}, {
				id: 'timeline3',
				src: "dists/images/timeline3.svg"
			}, {
				id: 'timeline4',
				src: "dists/images/timeline4.svg"
			}, {
				id: 'timeline5',
				src: "dists/images/timeline5.svg"
			}, {
				id: 'timeline6',
				src: "dists/images/timeline6.svg"
			}, {
				id: 'timeline7',
				src: "dists/images/timeline7.svg"
			},
		];
		var percentage = 0;
		var oldPercentage = 0;
		var loaded = 0;
		var loadFileTotal = files.length;
		var loader = new SVGLoader(document.getElementById('loader'), {
			speedIn: 667,
			easingIn: mina.easeinout
		});
		window.loader = loader;
		loader.show();
		var event; // The custom event that will be created
		var _event = 'secondOnload';
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(_event, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = _event;
		}
		event.eventName = _event;
		var preload = new createjs.LoadQueue();
		var textOptions = {
			useEasing: true,
			useGrouping: true,
			suffix: '%',
		};
		var brackets = document.querySelector('.brackets');
		var animationEvent = whichAnimationEvent();
		var loop = 0;
		var maxLoop = 1;
		var stopAnimation = false;
		if (!!animationEvent)
        brackets.addEventListener(animationEvent, handleAnimation);
		preload.addEventListener("fileload", handleFile);
		preload.addEventListener("error", handleFile);
		preload.loadManifest(files);
		var counter;
        function handleAnimation() {
			if (!stopAnimation)
				return false;
			if (loop === maxLoop) {
				loader.hide();
				document.getElementById('loader-text')
					.style.opacity = 0;
				var logoPP = document.getElementById('logopp');
				classie.remove(document.body, "loading");
				classie.add(document.body, "loaded");
				classie.remove(logoPP, "loading");
				classie.add(logoPP, "loaded");
			}
			loop++;
		}
		function handleFile(fileEvent) {
			loaded++;
			if (!!counter && !!counter.stop)
				counter.stop();
			oldPercentage = percentage;
			percentage = (loaded / loadFileTotal) * 100;
			counter = new countUp("loader-text", oldPercentage, percentage, 0, 0.333, textOptions);
			if (!!counter && !!counter.start)
				counter.start();
			if (percentage === 100) {
				stopAnimation = true;
				if (document.createEvent) {
					document.dispatchEvent(event);
				} else {
					document.fireEvent("on" + event.eventType, event);
				}
			}
			if (!!fileEvent.item && !!fileEvent.item.id) {
				var wrapper = document.getElementById("wrapper__" + fileEvent.item.id);
				if (!!wrapper)
					wrapper.appendChild(fileEvent.result);
			} else {
				if (!!fileEvent.result)
					document.body.appendChild(fileEvent.result);
			}
		}
	}
	window.onload = onLoad;
	// utils

	function whichAnimationEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var animations = {
			'animation': 'animationiteration',
			'OAnimation': 'oAnimationIteration',
			'MozAnimation': 'animationiteration',
			'WebkitAnimation': 'webkitAnimationIteration'
		}

		for (t in animations) {
			if (el.style[t] !== undefined) {
				return animations[t];
			}
		}
	}
}());
