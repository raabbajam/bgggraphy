//= include '../../bower_components/progressbar.js/dist/progressbar.min.js'
//= include '../../bower_components/PreloadJS/lib/preloadjs-0.6.0.min.js'
//= include '../../bower_components/countUp.js/countUp.min.js'

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
            var text = document.querySelector('#loader-text');
            var loader = document.querySelector('#loader');
            var textOptions = {
                useEasing: true,
                useGrouping: true,
            };
            preload.addEventListener("fileload", handleFileComplete);
            var bar = new ProgressBar.Circle('#loader', {
                duration: 3333,
                strokeWidth: 33.3,
                fill: "rgba(0, 0, 0, 0.2)",
                text: text,
                from: { color: '#900' },
                to: { color: '#090' },
                step: function(state, bar) {
                    bar.path.setAttribute('stroke', state.color);
                    bar.path.setAttribute('fill', state.color);
                },
            });
            // Expose the bar to global so it is easy to test from console
            window.bar = bar;
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
                bar.animate(loaded / loadFileTotal, function () {
                    if (percentage === 100) {
                        loader.style.opacity = 0;
                        loader.style.zIndex = -1;
                        if (document.createEvent) {
                            document.dispatchEvent(event);
                        } else {
                            document.fireEvent("on" + event.eventType, event);
                        }
                    }
                });
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
