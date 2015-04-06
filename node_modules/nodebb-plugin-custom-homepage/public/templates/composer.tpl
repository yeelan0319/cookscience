<div class="modal fade composer-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <input class="title form-control" type="text" tabindex="2" placeholder="Enter the procedure name" />
      </div>
      <div class="modal-body">
      	<div class="container-fluid">
      		<!-- IF !isEditing -->
      		<div class="form-horizontal">
		      	<div class="form-group">
		      		<label class="col-xs-1 control-label text-left">Category: </label>
		      		<div class="category-list-container col-xs-11 col-lg-3">
						<select tabindex="3" class="form-control category-list">
							<option value="0">Select a category</option>
						</select>
					</div>
		      	</div>
		    </div>
		    <!-- ENDIF !isEditing -->
		    <div class="form-group">
	      		<label class="control-label">Purpose: </label>
				<div class="tags-container">
					<textarea type="text" class="purpose form-control" placeholder="Describe purpose of protocol" tabindex="4" rows="2"/>
				</div>
	      	</div>
	      	<div class="form-group">
	      		<label class="control-label">Reagents: </label>
				<div class="tags-container">
					<textarea type="text" class="reagents form-control" placeholder="List the reagents used" tabindex="4" rows="5"/>
				</div>
	      	</div>

	      	<div class="form-group">
	      		<label class="control-label">Procedure: </label>
				<div class="tags-container">
					<textarea type="text" class="procedure form-control" placeholder="Describe procedure of protocol" tabindex="6" rows="5"/>
				</div>
	      	</div>
	      	<div class="form-group">
	      		<label class="control-label">Results: </label>
				<div class="tags-container">
					<textarea type="text" class="results form-control" placeholder="Describe the expected results" tabindex="7" rows="3"/>
				</div>
	      	</div>
	      	<div class="form-group">
	      		<label class="control-label">Reference: </label>
				<div class="tags-container">
					<textarea type="text" class="reference form-control" placeholder="Reference" tabindex="8" rows="3"/>
				</div>
	      	</div>
	      	<!-- IF showTags -->
	      	<div class="form-group">
	      		<label class="control-label">Tags: </label>
				<div class="tags-container">
					<input type="text" class="tags form-control" placeholder="[[tags:enter_tags_here, {minimumTagLength}, {maximumTagLength}]]" tabindex="9"/>
				</div>
	      	</div>
	      	<!-- ENDIF showTags -->
		</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default composer-discard" data-action="discard" tabindex="-1"><i class="fa fa-times"></i> [[topic:composer.discard]]</button>
		<button class="btn btn-primary composer-submit" data-action="post" tabindex="10"><i class="fa fa-check"></i> [[topic:composer.submit]]</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
