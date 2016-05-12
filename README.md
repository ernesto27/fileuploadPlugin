Multi fileupload
===========

jquery plugin for upload multi files and show preview


## Install


load javascript before close body tag 
```html	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.fileupload.js"></script>	
```

## Examples

```javascript

    $(function(){
		$('#example').fileUpload({
			url: 'upload.php'
		});
	});
	

```

## Options

### url
url that process the upload


