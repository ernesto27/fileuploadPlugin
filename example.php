<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.css">

	<style>
	    .fileupload-imagewrapper{
	        position:relative;
	        width: 150px;
	        height:150px;
	    }

	    .fileupload-imagewrapper:hover {
	        opacity: 0.5;
	    }
	    .fileupload-xmark{
	        position:absolute;
	        top:5px;
	        right:5px;
	        font-size: 14px;
	    }
	</style>
</head>
	

<body>
	
	<br><br>
	<div class="container">
		

		<form>
			<input type="file" class="fileupload-input" multiple>
			<br>
		</form>
		
		<button class="btn btn-primary btn-response">Log server response</button>

		<div id="example">
			
			<br>
			<div class="filesupload-wrapper" style="width: 150px;height: 200px;">
			</div>
		</div>



	</div>
	
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/handlebars/handlebars.min.js"></script>
	

	<!-- TEMPLATES -->
	<script type="text/template" id="fileupload-previewtpl">
	    <div class="files-upload-item">
			<div class="fileupload-imagewrapper">
				<img src="{{url}}" width="150" height="150">
				<a href="#" class="fileupload-removeitem" data-id="{{id}}"><span class="glyphicon glyphicon-remove fileupload-xmark" aria-hidden="true" title="remove"></span></a>
			</div>
			<br>
			<div class="progress">
	            <div id="" class="preview-{{id}} progressBar progress-bar progress-bar-striped active" role="progressbar" style="width: 5%">
	            </div>
	        </div>
		</div>
	</script>
	

	<script src="js/jquery.fileupload.js"></script>
	<script>	
	$(function(){
		$('#example').fileUpload({
			url: 'upload.php',
			maxSize: 200 // For now on kb
		});
	});

	</script>

	

</body>
</html>










