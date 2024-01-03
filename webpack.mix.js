let mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .sass("src/sass/popup.scss", "dist/css")
  .js("src/js/popup.js", "dist/js")
  .vue()
  .copy("src/img/", "dist/img")
  .options({
    processCssUrls: false,
  });