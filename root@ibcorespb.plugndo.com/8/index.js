"use strict";
(function () {
    Modules.Events.addStartupListener(run);
    function run() {
        var c = document.getElementById("march");
        var ctx = c.getContext("2d");

        c.height = window.innerHeight;
        c.width = window.innerWidth;

        var characters = 'С 8 марта!\u2698\u2661\u2665';

        var font_size = 20;
        var columns = c.width/font_size;

        var drops = [];

        for(var x = 0; x < columns; x++)
            drops[x] = 1;


        function draw()
        {

            ctx.fillStyle = "rgba(197, 31, 164, 0.05)";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = "#FFF"; //green text
            ctx.font = font_size + "px arial";

            for(var i = 0; i < drops.length; i++)
            {

                var text = characters[Math.floor(Math.random()*characters.length)];

                ctx.fillText(text, i*font_size, drops[i]*font_size);

                if(drops[i]*font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                drops[i]++;
            }
        }

        setInterval(draw, 100);
    }
}());