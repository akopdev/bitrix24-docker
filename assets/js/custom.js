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
      commands: ["curl http://some.url --output some.file", "docker-compose up -d"]
    });
  });


})(jQuery);