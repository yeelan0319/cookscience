<div class="row">
	<div class="well">
		<h2>Thank you for your registration!</h2>
		<h4>Please help us complete your information</h4>
		<div class="col-xs-12 userinfo-container">
			<form class="form-horizontal" role="form" action="{relative_path}/register" method="post">
				<div class="form-group">
					<label for="email" class="col-lg-2 control-label">Institution</label>
					<div class="col-lg-5">
						<input class="form-control" type="text" placeholder="Enter research institution" name="institution" id="institution" autocorrect="off" autocapitalize="off" />
					</div>
				</div>
				<div class="form-group">
					<label for="username" class="col-lg-2 control-label">Research group</label>
					<div class="col-lg-5">
						<input class="form-control" type="text" placeholder="Enter research group" name="lab" id="lab" autocorrect="off" autocapitalize="off" />
					</div>
				</div>
				<div class="form-group">
					<label for="username" class="col-lg-2 control-label">Discipline</label>
					<div class="col-lg-10">
						<div class="row">
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Animal Techniques
						    </label>
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Biochecmistry
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Bioinformatics & Biostatistics
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Cell Biology
						    </label>
						</div>
						<div class="row">
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Developmental Biology
						    </label>
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Essential Data
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> General Lab Techniques
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Genetics & Genomics
						    </label>
						</div>
						<div class="row">
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Histology
						    </label>
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Imaging Techniques
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Immuology
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Media & Solutions
						    </label>
						</div>
						<div class="row">
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Microbiology
						    </label>
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Model Organisms
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Molecular Biology
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Neuroscience
						    </label>
						</div>
						<div class="row">
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Physiology
						    </label>
							<label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Plant Biology
						    </label>
						    <label class="col-xs-6 col-md-3">
						      	<input type="checkbox" name="discipline_group[]" value="" /> Research Tools
						    </label>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label class="col-xs-offset-2 col-xs-10">
				      	<input type="checkbox" name="receiveAd" value="" checked="true" /> I would like to receive vendor promotion information
				    </label>
				</div>

				<div class="form-group">
					<div class="pull-right col-xs-12 col-lg-2">
						<button class="btn btn-primary btn-block" id="submit" type="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>
</div>