(function ($) {
  "use strict";

  SaasTrend.config({
    appearAnimation: true, // Enable disable single page scroll on click
    singlePageScroll: true, // Enable disable single page scroll on click
  });


  $(function () {

    new Shell(document.getElementById('shell'), {
      user: "akop",
      host: "local",
      theme: "light",
      responsive: true,
      commands: ["curl https://akopkesheshyan.github.io/bitrix24-docker/docker-compose.yml > docker-compose.yml", "docker-compose up -d"]
    });
  });


})(jQuery);