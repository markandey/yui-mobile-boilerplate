YUI().use('app-base','flickrImageLoader','yui3-mobile-core', function (Y) {
        var app = new Y.App({
            views: {},
            render:function(){

            }
        });

        app.route('/', function () {
            Y.one('h1').set('text', 'Example App - Home');
            var v=new Y.FlickrImageListView();
            this.views.mainView=v;
            v.render();
            this.showView('mainView');
        });

        
        app.route('*', function (req) {
            Y.one('h1').set('text', 'Example App - ' + req.path);
        });

        
        app.render().dispatch();
});