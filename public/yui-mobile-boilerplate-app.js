YUI().use('app-base','flickrImageLoader', function (Y) {
        Y.BoilerPlateApp = Y.Base.create('boilerPlateApp', Y.App, [], {
            render: function () {
                Y.BoilerPlateApp.superclass.render.apply(this, arguments);
                return this;
            },
            initializer: function() {
                    var scrollview = new Y.ScrollView({
                        srcNode:"#content",
                        height:"400px"
                    });
                    scrollview.render();
                    this.contentScrollView=scrollview;
                    setTimeout(function () {
                      window.scrollTo(0, 1);
                    }, 1000);
            },
            showFlickrPhotoList:function (){
                var that=this;
                this.showView('mainView',{},{},function (){
                    //update now
                    that.updateScrollView();
                    //update on every modellist update
                    var flickrImageList=that.views.mainView.instance.get('model');
                    flickrImageList.on('add',Y.bind(that.updateScrollView, that));
                });
            },
            showFlickrPhoto:function (id){
                var that=this;
                console.log(id);
                var photoViewInstance=new Y.FlickrImageView({
                    model:new Y.FlickrImage({"id":id})
                });
                photoViewInstance.render();
                this.showView(photoViewInstance,{},{},function (){
                    //update now
                    that.updateScrollView();
                    //update on every modellist update
                    var flickrImage=photoViewInstance.get('model');
                    flickrImage.on('change',Y.bind(that.updateScrollView, that));
                });
            },
            updateScrollView:function (){
                this.contentScrollView.syncUI();
            }
        });
        var app = new Y.BoilerPlateApp({
            views: {    
                        "mainView":{type:"FlickrImageListView"},
                        "photoView":{type:"FlickrImageView"}
                    },
            container    : '#content ul',
            viewContainer: '#content ul'
        });

        app.route('/', function (req) {
            Y.one('h1').set('text', 'Flickr Example - Home');
            this.showFlickrPhotoList();
        });

        app.route('/photo/*', function (req) {
            var match=req.path.match(/^\/photo\/([0-9]+)/);

            Y.one('h1').set('text', 'Flickr - Photo');
            if(match){
                var id=match[1];
                this.showFlickrPhoto(id);
            }
            
        });

        
        app.route('*', function (req) {
            Y.one('h1').set('text', 'Flickr Example - ' + req.path);
            this.showFlickrPhotoList();
        });

        app.render().dispatch();
});