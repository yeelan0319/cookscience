<h1>Import/Export CSV</h1>
<hr />

<form id="uploadForm" action="{relative_path}/admin/uploadcsv" method="post" enctype="multipart/form-data">
      <div class="form-group">
            <label for="csvInput">Choose CSV file to import</label>
            <input type="file" id="csvInput" name="files[]">
      </div>
      <input id="csrf_token" type="hidden" value="{csrf}" />
      <button id="csvUploadSubmitBtn" type="submit" class="btn btn-primary">Upload</button>
</form>
<script>
$('#uploadForm').off('submit').submit(function() {
	console.log("haha");
	$(this).ajaxSubmit({
		headers: {
			'x-csrf-token': $('#csrf_token').val()
		},
		error: function(xhr) {
			xhr = maybeParse(xhr);
			console.log('error: ' + xhr.responseJSON.error);
		},

		success: function(response) {
			response = JSON.parse(response);

			if (response.error) {
				console.log('error: ' + response.error);
				return;
			}
			console.log('success!!');
		}
	});
	return false;
});	
</script>
