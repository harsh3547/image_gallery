openerp.image_gallery = function(instance) {
    var _t = instance.web._t,
        QWeb = instance.web.qweb;
    var tableau = []
    var taille = 0
    var pswp = null;
    var listImageProd = []
    var imageIndexZero = "";
    
    instance.web.Sidebar = instance.web.Sidebar.extend({
        
        start: function() {
            var self = this;
            this._super(this);
            var view = self.getParent();
            
            if(view.fields_view.model==='product.template'){
                self.add_items('other', [
                    {   label: _t('Open Gallery'),
                        callback: self.on_click_open_gallery,
                        classname: 'oe_share' },
                ]);
            }
        },
        
        on_click_open_gallery: function() { 
            var self = this;            
            instance.web.blockUI();             
            tableau = []
            taille = 0
            var list_img = "";            
           
            var ids = self.getParent().get_selected_ids();
            if (ids.length) {            
                var id_first = Math.min.apply(Math,ids);
                
                Products2 = new instance.web.Model("product.template");
                Products2.query(['name','type','image']).filter([['id', '=', id_first]]).all().then(function (pieces) {
                        _.each(pieces, function(piece){
                            imageIndexZero = "data:"+piece['type']+";base64," +piece['image'];
                        });                     
                });  
                
                Products = new instance.web.Model("product.template");
                Products.query(['name','type','image_medium','id']).filter([['id', 'in', ids]]).order_by('id').all().then(function (results) {
			    _.each(results, function(result){ 			         
				element = [result['name'],result['type'],result['image_medium'],result['id']];
				tableau.push(element);
			    });
	            taille = tableau.length;
                   
	            if(taille > 0){	    
                        list_img = '<ul class="pswp__thumbnail_list">';
                        for (i=0; i<taille; i++){
                           
                           list_img += '<li class="list_item"><img src="data:'+tableau[i][1]+';base64,'+tableau[i][2]+'" alt="'+tableau[i][0]+'" title="'+tableau[i][0]+'" img_id="'+tableau[i][3]+'" img_index="'+i+'" list_img_taille="'+taille+'"/></li>';
                        }
	                list_img += '</ul>';
	                var htmlDiv = " ";
                        htmlDiv += " <button id='btn'>Open PhotoSwipe</button>";                        
                        htmlDiv += "<div class='pswp' tabindex='-1' role='dialog' aria-hidden='true'> ";
                            htmlDiv += "<div class='pswp__bg'></div> ";
                            
                            htmlDiv += "<div class='pswp__scroll-wrap'> ";

                                htmlDiv += "<div class='pswp__container' style='bottom:160px !important;'> ";
                                     htmlDiv += "<div class='pswp__item'></div> ";
                                    htmlDiv += "<div class='pswp__item'></div> ";
                                    htmlDiv += "<div class='pswp__item'></div> ";
                                htmlDiv += "</div> ";
                                
                                htmlDiv += "<div id='gallery_bottom' class='pswp__bottom'> ";
                                
                                htmlDiv += "</div>";
                                 
                                htmlDiv += "<div class='pswp__ui pswp__ui--hidden'> ";

                                    htmlDiv += "<div class='pswp__top-bar'> ";                                        

                                        htmlDiv += "<div class='pswp__counter'></div> ";

                                        htmlDiv += "<button class='pswp__button pswp__button--close' title='Close (Esc)'></button> ";

                                        htmlDiv += "<button class='pswp__button pswp__button--fs' title='Toggle fullscreen'></button> ";

                                        htmlDiv += "<button class='pswp__button pswp__button--zoom' title='Zoom in/out'></button> ";

                                        htmlDiv += "<div class='pswp__preloader'> ";
                                            htmlDiv += "<div class='pswp__preloader__icn'> ";
                                              htmlDiv += "<div class='pswp__preloader__cut'> ";
                                               htmlDiv += " <div class='pswp__preloader__donut'></div> ";
                                              htmlDiv += "</div> ";
                                            htmlDiv += "</div> ";
                                        htmlDiv += "</div> ";
                                    htmlDiv += "</div> ";

                                    htmlDiv += "<div class='pswp__share-modal pswp__share-modal--hidden pswp__single-tap'> ";
                                        htmlDiv += "<div class='pswp__share-tooltip'></div>  ";
                                    htmlDiv += "</div> ";

                                    htmlDiv += "<button class='pswp__button pswp__button--arrow--left' title='Previous (arrow left)'> ";
                                    htmlDiv += "</button> ";

                                    htmlDiv += "<button class='pswp__button pswp__button--arrow--right' title='Next (arrow right)'> ";
                                    htmlDiv += "</button> ";

                                    htmlDiv += "<div class='pswp__caption'> ";
                                        htmlDiv += "<div class='pswp__caption__center'></div> ";
                                    htmlDiv += "</div> ";
                                    
                                  htmlDiv += "</div> ";
                                  
                                htmlDiv += "</div> ";

                            htmlDiv += "</div> ";
                        $('body').append(htmlDiv);                        
                        pswp = self.openPhotoSwipe(tableau,taille); 
                        $('#gallery_bottom').html(list_img);
                        $('.list_item').click(function() {                          
                            var img_index = parseInt($(this).find('img').attr("img_index"),10);  
                            var img_id = parseInt($(this).find('img').attr("img_id"),10);
                            
                            pswp.items[img_index].src = listImageProd[img_index];
                            pswp.goTo(img_index);   
                            
                        });
                        $(".pswp__bottom").css({"left":"100px !important;","width":$(window).width()+"px"});                          
                        
	            } else {
	                 instance.web.dialog($("<div />").text(_t("No image found for this document.")), {
	                    title: _t("Warning"),
	                    modal: true
	                });
	            }
	    });           
            self.getProductsImage(ids);
        }

            instance.web.unblockUI();
        },
        openPhotoSwipe : function(tableau,taille) {
            
                var pswpElement = document.querySelectorAll('.pswp')[0];
                // build items array
                var d_img="";
                var items = [];
                for (i=0; i<taille; i++){   
                    if(i==0){
                        d_img = imageIndexZero;
                    }
                    else {
                       d_img = "data:"+tableau[i][1]+";base64," +tableau[i][2]; 
                    }                   
                    
                    var elt = {
                        src: d_img,
                        w: 1024,
                        h: 1024
                    };
                    items.push(elt);
                }
                // define options (if needed)
                var options = {
                    // history & focus options are disabled on CodePen
                    history: false,
                    focus: false,                    
                };               
                
                var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();                
                return gallery;
        },
        getProductsImage : function(ids){      
            var k = 0;
            Products = new instance.web.Model("product.template");
            Products.query(['name','type','image']).filter([['id', 'in', ids]]).order_by('id').all().then(function (pieces) {
                    _.each(pieces, function(piece){ 			         
                        element = "data:"+piece['type']+";base64," +piece['image'];
                        listImageProd.push(element);                                
                        pswp.items[k].src = element;                        
                        k++;
                    }); 
                    pswp.updateSize(true);
            });            
        },
        
    });
}