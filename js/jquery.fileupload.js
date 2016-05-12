;(function($){
	var customsUploadOptions = {
		url: '',
        maxSize: 3000
	};

	$.fn.fileUpload = function(options){
	
		options = $.extend(true, {}, customsUploadOptions, options || {});

		var indexFile = 0;
		var indexAjax = 0;
		var deletedIndex = []
        var response = [];

		window.fileUpload = {
			files: [],
			previewTpl: Handlebars.compile($('#fileupload-previewtpl').html()),
			indexPreview: 0,

			init: function(){
				this.events();
			},

			events: function(){
				$('.fileupload-input').on('change', this.showPrevew);
				$('.btn-response').on('click', this.viewResponse);
                $('body').on('click', '.fileupload-removeitem', this.removeItem);
			},

			// Methods
			showPrevew: function(){
                if(this.files){
                    for (var i = 0; i < this.files.length; i++){
                        var file = this.files[i];
                        var type = file.type;
                        var reader = new FileReader();
               			

                        // Check valid image
                        if(fileUpload.isValidImage(type)){
                        	file.id = indexFile;
                            // Check maxfilesize upload
                            if(fileUpload.isValidSize(file.size)){
                               fileUpload.files.push(file);
                        	   indexFile += 1;
                            }
                        }
                    }
                }

                if(fileUpload.files.length){
                    // Render preview - for now use handlebars template
                    // later you have to consider other option
                    fileUpload.renderPreview(fileUpload.files[fileUpload.indexPreview]);

                    // Do ajax upload files
                    fileUpload.ajaxUpload();
                }


			},
		
			renderPreview: function(file){
                if(!file) return;
				var reader = new FileReader();
                reader.onload = function (e) {
                    $('.filesupload-wrapper').append(fileUpload.previewTpl({
                        url: e.target.result,
                        id: fileUpload.indexPreview
                    }));

                    fileUpload.indexPreview += 1;

                    if(fileUpload.indexPreview == fileUpload.files.length ) return;
                    fileUpload.renderPreview(fileUpload.files[fileUpload.indexPreview]);
                }
                reader.readAsDataURL(file);
			},

			removeItem: function(e){
                e.preventDefault();
                var that = $(this);
                that.parent().parent().remove();
                var index = that.data("id");
                deletedIndex.push(index);
            },

			// Helpers
			isValidImage: function(type){
				var validFormatImages = ['image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/png'];
                if ($.inArray(type, validFormatImages) != -1){
                    return true;
                    
                }
			},

            isValidSize: function(size){
                if(size <= options.maxSize * 1024){
                    return true;
                }
            },


			// Ajax request
			ajaxUpload: function(){
                if(!fileUpload.files[indexAjax]) return;
                var formData = new FormData();
                formData.append("file", fileUpload.files[indexAjax]);

                $.ajax({
                    url: options.url,
                    type: 'POST',
                    data: formData,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    xhr: function() {
                        var myXhr = $.ajaxSettings.xhr();
                        if(myXhr.upload){
                            myXhr.upload.addEventListener('progress',progress, false);
                        }
                        return myXhr;
                    },
                    success: function(data){
                    	
                        $(".preview-" + fileUpload.files[indexAjax].id)
                                .removeClass("progress-bar-striped")
                                .addClass("progress-bar-success");

                        // Add server response to array
                        data.id = indexAjax;
                        response.push(data);    	

                        // Go to next item
                        indexAjax += 1;

                        if(fileUpload.checkFiles()){
                        	// Check if are more items to load 
                        	fileUpload.ajaxUpload();
                        }

                    },
                    error: function(){
                    }
                });

                function progress(e){
	                if(e.lengthComputable){
	                    var max = e.total;
	                    var current = e.loaded;
	                    var percentage = (current * 100)/max;
	                    $(".preview-" + fileUpload.files[indexAjax].id).css("width", percentage + "%");
	                }
            	}

            },


            checkFiles: function(){
                if(indexAjax < fileUpload.files.length ){
                    return true;
                }

                fileUpload.noItems = true;
                
            },

            viewResponse: function(){
                var items = [];
            	response.forEach(function(item){                           
                    if(deletedIndex.indexOf(item.id) == -1 ){
                        items.push(item);
                    }
                });
                console.log(items);
                return items;
            }
		};

		fileUpload.init();
	}
})(jQuery);