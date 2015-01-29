//= include '../../bower_components/progressbar.js/dist/progressbar.min.js'
//= include '../../bower_components/PreloadJS/lib/preloadjs-0.6.0.min.js'
//= include '../../bower_components/countUp.js/countUp.min.js'

    (function() {
        function onLoad() {
            var files = ["dists/css/index.css", "dists/js/index.js"];
            var percentage = 0;
            var oldPercentage = 0;
            var loaded = 0;
            var loadFileTotal = files.length;
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
                from: { color: '#f00' },
                to: { color: '#0f0' },
                step: function(state, bar) {
                    bar.path.setAttribute('stroke', state.color);
                    bar.path.setAttribute('fill', state.color);
                },
            });
            // Expose the bar to global so it is easy to test from console
            window.bar = bar;
            files.forEach(function (file) {
                preload.loadFile(file);
            });
            var counter;
            function handleFileComplete(event) {
                loaded++;
                console.log(loaded, event);
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
                    }
                });
                document.body.appendChild(event.result);
            }
        }
        window.onload = onLoad;
    }());
