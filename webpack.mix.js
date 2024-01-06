let mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");

mix
  .setPublicPath("./")
  .sass("src/sass/popup.scss", "dist/css")
  .options({
    processCssUrls: false,
    postCss: [tailwindcss("./tailwind.config.js")],
  })
  .js("src/js/popup.js", "dist/js")
  .vue()
  .copy("src/img/", "dist/img");
