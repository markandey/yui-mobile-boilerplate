YUI.add('flickrImageLoader', function(Y) {
//#######################################################
/**
* This is model to hold the flickrimage data
*
* @class FlickrImage
* @constructor
*/
//#######################################################
    Y.FlickrImage = Y.Base.create('flickrImage', Y.Model, [], {
        sync: function(action, options, callback) {
            switch(action) {
            case 'read':
                Y.YQL("select * from flickr.photos.info where photo_id='"+options.id+"' and api_key='0fbb2b721757f77a6a9d038f4649a2bf'", function(r) {
                    var photo = r.query.results.photo;
                    callback(null, photo);
                });
                return;
            default:
                callback(null, null);
                return
            }
        },
        parse: function(res) {
            for(p in res){
                if(res.hasOwnProperty(p) ){
                    this.set(p,res[p]);
                }
            }
            this.fire('change', {});
            return;
        }

    }, {
        ATTRS: {
            id: {
                value: null
            }
        }
    });


//#######################################################
/**
* This is modelList of FlickrImage
*
* @class FlickrImageList
* @constructor
*/
//#######################################################
    Y.FlickrImageList = Y.Base.create('flickrImageList', Y.ModelList, [], {
        model: Y.FlickrImage,
        sync: function(action, options, callback) {
            switch(action) {
            case 'read':
                Y.YQL("select * from flickr.photos.interestingness(20) where api_key='0fbb2b721757f77a6a9d038f4649a2bf'", function(r) {
                    var photos = r.query.results.photo;
                    var flickrImages = [];
                    for(var i = 0; i < photos.length; i++) {
                        fi = new Y.FlickrImage(photos[i])
                        flickrImages.push(fi);
                    }
                    callback(null, flickrImages);
                });
                return;
            default:
                callback(null, null);
                return
            }
        },
        parse: function(res) {
            this.add(res);
            var e = {};
            if(Y.Lang.isArray(res)) {
                e.model = res[res.length - 1];
            } else {
                e.model = res;
            }
            this.fire('add', e);
        }
    }, {
        ATTRS: {}
    });

//#######################################################
/**
* This is view : FlickrImageView
*
* @class FlickrImageView
* @constructor
*/
//#######################################################
    Y.FlickrImageView = Y.Base.create('flickrImageView', Y.View, [], {
        events: {},
        template: '<img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg">',
        initializer: function() {
            var flickrImage = this.get('model');
            flickrImage.after('change',Y.bind(this.render, this));
            
        },
        render: function() {
            var container = this.get('container'),
                html = '',
                flickrImage = this.get('model');
            var template = this.template;
            if(!container._node){
                return;
            }
            if(!flickrImage.get('secret')){
                flickrImage.load({'id':this.get('model').get('id') });    
                container.setHTML('Loading......');
                return;
            }
            
            container.setHTML(Y.Lang.sub(template, flickrImage.toJSON()));
            return this;
        }
    }, {
        ATTRS: {
            container: {
                valueFn: function() {
                    return Y.Node.one('#flickrImageView');
                }
            },
            model: {
                valueFn: function() {
                    image= new Y.FlickrImage();
                    image.set('id',2186714153);
                    return image;
                }
            },
            parentApp: {
                value: null
            }
        }
    });

//#######################################################
/**
* This is view : FlickrImageListView
*
* @class FlickrImageListView
* @constructor
*/
//#######################################################
    Y.FlickrImageListView = Y.Base.create('flickrImageListView', Y.View, [], {
        events: {},
        template: '<img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_q.jpg">',
        initializer: function() {
            var flickrImageList = this.get('model');
            this.template = Y.Node.one('#flickr-image-listitem-template').getContent();
            flickrImageList.after('add', this.render, this);
            flickrImageList.after('change', this.render, this);
            flickrImageList.after('destroy', this.destroy, this);
        },
        render: function() {
            var container = this.get('container'),
                html = '',
                flickrImageList = this.get('model');
            if(flickrImageList.isEmpty()) {
                html = "<h2>Loading....</h2>"
                this.get('model').load();
            } else {
                var template = this.template;
                flickrImageList.each(function(photo) {
                    html = html + Y.Lang.sub(template, photo.toJSON());
                })
            }
            container.setHTML(html);
            return this;
        }
    }, {
        ATTRS: {
            container: {
                valueFn: function() {
                    return Y.Node.one('#flickrImageList');
                }
            },
            model: {
                valueFn: function() {
                    return new Y.FlickrImageList();
                }
            },
            parentApp: {
                value: null
            }
        }
    });

}, '0.0.0', {
    requires: ['json', 'model', 'view', 'yql', 'node', 'events', 'model-list']
});