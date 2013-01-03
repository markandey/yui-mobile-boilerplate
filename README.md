## YUI Mobile Boilerplate 

This is example code to Kickstart Mobile App using YUI3. Code Uses [YUI scrollView](http://yuilibrary.com/yui/docs/scrollview/) and [App Framework](http://yuilibrary.com/yui/docs/app/) to make a single page app in YUI3.

## How to Use?

Install express and nodeJS on your machine to create a static web-server. This is needed to see the demo. 

    $ git clone https://github.com/markandey/yui-mobile-boilerplate.git
    $ cd yui-mobile-boilerplate
    $ node node-serve.js 
    Connect To 127.0.0.1:5000

Open 127.0.0.1:5000 in browser.

Note: Files in public directory is served statically, and these static files are responsible for all the magic. You can use ur own choice of webserver, if you can configure url pattern as node-serve.js does

### How It works??
This is a single page app written using [YUI's App Framework](http://yuilibrary.com/yui/docs/app/),  App is created and dispached in file `yui-mobile-boilerplate-app.js`.  App uses models and view implemented in `yui-mobile-model-flickr.js`.


`yui-mobile-boilerplate-app.js` is what you will modify to make your own custom app. `yui-mobile-model-flickr.js` contains the model and views for flickr implementation this completely needs to be replaced by your own custom implementation. you can create several such files and add dependency in `yui-mobile-boilerplate-app.js` and call your views in one of your defined routing.

## This project is in progress!
This is not yet ready for use!!

![YUI-Mobile-Screen](https://raw.github.com/markandey/markandey.github.com/master/images/yui-mobile.jpg)


