//= include '../../bower_components/PreloadJS/lib/preloadjs-0.6.0.min.js'
//= include '../../bower_components/snap.svg/dist/snap.svg-min.js'
//= include '../../bower_components/countUp.js/countUp.min.js'
//= include '../../bower_components/PageLoadingEffects/js/classie.js'
//= include '../../bower_components/PageLoadingEffects/js/svgLoader.js'
    (function() {
        function onLoad() {
            var files = [
                "dists/css/index.css",
                "dists/js/index.js",
                {id: 'man', src: "dists/images/man.svg"},
                {id: 'image1', src: "dists/images/image1.jpg"},
                {id: 'profile1', src: "dists/images/profil1.svg"},
                {id: 'profile2', src: "dists/images/profil2.svg"},
                {id: 'profile3', src: "dists/images/profil3.svg"},
                {id: 'profile4', src: "dists/images/profil4.svg"},
                {id: 'profile5', src: "dists/images/profil5.svg"},
                {id: 'profile6', src: "dists/images/profil6.svg"},
                // {id: 'timeline1', src: "dists/images/timeline1.svg"},
                {id: 'timeline2', src: "dists/images/timeline2.svg"},
                {id: 'timeline3', src: "dists/images/timeline3.svg"},
                {id: 'timeline4', src: "dists/images/timeline4.svg"},
                // {id: 'timeline5', src: "dists/images/timeline5.svg"},
                // {id: 'timeline6', src: "dists/images/timeline6.svg"},
                // {id: 'timeline7', src: "dists/images/timeline7.svg"},
            ];
            var percentage = 0;
            var oldPercentage = 0;
            var loaded = 0;
            var loadFileTotal = files.length;
    		var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );
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
            preload.addEventListener("fileload", handleFileComplete);
            preload.loadManifest(files);
            var counter;
            function handleFileComplete(fileEvent) {
                loaded++;
                if (!!counter && !!counter.stop)
                    counter.stop();
                oldPercentage = percentage;
                percentage = (loaded / loadFileTotal) * 100;
                counter = new countUp("loader-text", oldPercentage, percentage, 0, 3.333, textOptions);
                if (!!counter && !!counter.start)
                    counter.start();
                if (percentage === 100) {
                    setInterval(function () {
                        loader.hide();
                        document.getElementById('loader-text').style.opacity = 0;
                        document.body.className = "loaded";
                    }, 500);
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
                    document.body.appendChild(fileEvent.result);
                }
            }
        }
        window.onload = onLoad;
    }());
