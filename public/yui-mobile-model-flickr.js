YUI.add('flickrImageLoader', function(Y) {
    Y.FlickrImage = Y.Base.create('flickrImage', Y.Model, [], {}, {
        ATTRS: {
            farm: {
                value: "9"
            },
            id: {
                value: "8311464341"
            },
            isfamily: {
                value: "0"
            },
            isfriend: {
                value: "0"
            },
            ispublic: {
                value: "1"
            },
            owner: {
                value: "66759737@N04"
            },
            secret: {
                value: "f0e606010d"
            },
            server: {
                value: "8075"
            },
            title: {
                value: "Winterwonderland"
            }
        }
    });

    Y.FlickrImageList = Y.Base.create('flickrImageList', Y.ModelList, [], {
        model: Y.FlickrImage,
        sync:function (action, options, callback) {
            switch (action) {
            case 'read':
                Y.YQL("select * from flickr.photos.interestingness(20) where api_key='0fbb2b721757f77a6a9d038f4649a2bf'", function(r) {
                    //console.log(r.query.results.photo,that);
                    var photos=r.query.results.photo;
                    var flickrImages=[];
                    for(var i=0;i<photos.length;i++){
                        fi=new Y.FlickrImage(photos[i])
                        flickrImages.push(fi);
                    }
                    callback(null,flickrImages);
                    console.log('cal back done');
                });
                return;
            default:
                callback(null, null);
                return
            }
        },
        parse:function (res){
            console.log('in parse');
            this.add(res);
            var e={};
            if(Y.Lang.isArray(res)){
                e.model=res[res.length-1];    
            }else{
                e.model=res;
            }
            this.fire('add',e);
            console.log(this.toJSON());
        }
    }, {
        ATTRS: {}
    });

    Y.FlickrImageListView = Y.Base.create('flickrImageListView', Y.View, [], {
        events: {},
        template: '<img src="http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_q.jpg">',
        initializer: function() {
            var flickrImageList = this.get('model');
            this.template=  Y.Node.one('#flickr-image-listitem-template').getContent();
            flickrImageList.after('add', this.render, this);
            flickrImageList.after('change', this.render, this);
            flickrImageList.after('destroy', this.destroy, this);
        },
        render: function() {
            var container = this.get('container'),html='',flickrImageList=this.get('model');
            console.log('reder call');
            if(flickrImageList.isEmpty()){
                html="<h2>Loading....</h2>"
                this.get('model').load();
            }
            else{
                var template=this.template;
                flickrImageList.each(function(photo){
                    console.log('Render------>',photo.toJSON());
                    html=html+Y.Lang.sub(template,photo.toJSON());
                })
            }
            container.setHTML(html);
            Y.mobileContainerView.syncUI();
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
            }
        }
    });

}, '0.0.0', {
    requires: ['json', 'model','view', 'yql','node','events','model-list']
});
