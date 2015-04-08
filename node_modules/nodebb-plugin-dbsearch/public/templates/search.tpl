<div class="search">
	<div class="row">

		<div id="results" class="col-md-12" data-search-query="{search_query}">
			<!-- IF matchCount -->
			<div class="alert alert-info">[[search:results_matching, {matchCount}, {search_query}, {time}]] </div>
			<!-- ELSE -->
			<div class="alert alert-warning">[[search:no-matches]]</div>
			<!-- ENDIF matchCount -->

			<!-- IF posts.length -->
			<div class="row">
				<div class="col-md-2">
					<div class="topic-row panel panel-default clearfix">
						<div class="panel-body">
							<!-- BEGIN resultsInCategoryCount -->
							<a href="{relative_path}/search/{search_query_escaped}?in=titlesposts&categories[]={resultsInCategoryCount.cid}" class="search-result-text">
								<p>{resultsInCategoryCount.category}({resultsInCategoryCount.count})</p>
							</a>
							<!-- END resultsInCategoryCount -->
						</div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading" data-toggle="collapse" data-target=".search-options">
							<h3 class="panel-title"><i class="fa fa-caret-down"></i> [[global:search]]</h3>
						</div>
						<div class="panel-body search-options collapse">
							<form id="advanced-search">
								<div class="form-group post-search-item">
									<label>[[global:search]]</label>
									<input type="text" class="form-control" id="search-input" placeholder="[[global:search]]">
								</div>

								<div class="form-group post-search-item<!-- IF hidePostedBy --> hide<!-- ENDIF hidePostedBy -->">
									<label>[[search:by]]</label>
									<input type="text" class="form-control" id="posted-by-user" placeholder="[[search:posted-by]]">
								</div>

								<div class="form-group post-search-item">
									<label>[[search:post-time]]</label>
									<select id="post-time-filter" class="form-control">
										<option value="newer">[[search:newer-than]]</option>
										<option value="older">[[search:older-than]]</option>
									</select>
									<select id="post-time-range" class="form-control">
										<option value="">[[search:any-date]]</option>
										<option value="86400">[[search:yesterday]]</option>
										<option value="604800">[[search:one-week]]</option>
										<option value="1209600">[[search:two-weeks]]</option>
										<option value="2592000">[[search:one-month]]</option>
										<option value="7776000">[[search:three-months]]</option>
										<option value="15552000">[[search:six-months]]</option>
										<option value="31104000">[[search:one-year]]</option>
									</select>
								</div>

								<button type="submit" class="btn btn-default">[[global:search]]</button>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-10">
					<!-- BEGIN posts -->
					<div class="topic-row panel panel-default clearfix">
						<div class="panel-body">

							<a href="{relative_path}/topic/{posts.topic.slug}/{posts.index}" class="search-result-text">
								<h4>{posts.topic.title}</h4>
							</a>
							<div class="search-result-text">
								{posts.content}
								<p class="fade-out"></p>
							</div>

							<small>
								<span class="pull-right footer">
									<a href="{relative_path}/users/{posts.user.userslug}"><img class="user-img" title="{posts.user.username}" src="{posts.user.picture}"/></a>
									[[global:posted_in_ago, <a href="{relative_path}/category/{posts.category.slug}"><i class="fa {posts.category.icon}"></i> {posts.category.name}</a>, <span class="timeago" title="{posts.relativeTime}"></span>]]
								</span>
							</small>
						</div>
					</div>
					<!-- END posts -->
				</div>
				<!-- ENDIF posts.length -->
			</div>

			<!-- IF users.length -->
			<ul id="users-container" class="users-container">
<!-- BEGIN users -->
<li class="users-box registered-user" data-uid="{users.uid}">
	<a href="{relative_path}/user/{users.userslug}"><img src="{users.picture}" class="img-thumbnail"/></a>
	<br/>
	<div class="user-info">
		<span>
			<i class="fa fa-circle status {users.status}" title="[[global:{users.status}]]"></i>
			<a href="{relative_path}/user/{users.userslug}">{users.username}</a>
		</span>
		<br/>
		<div title="reputation" class="reputation">
			<i class='fa fa-star'></i>
			<span class='formatted-number'>{users.reputation}</span>
		</div>
		<div title="post count" class="post-count">
			<i class='fa fa-pencil'></i>
			<span class='formatted-number'>{users.postcount}</span>
		</div>
	</div>
</li>
<!-- END users -->
			</ul>
			<!-- ENDIF users.length -->

			<!-- IF tags.length -->
<!-- BEGIN tags -->
<h3 class="pull-left tag-container">
	<a href="{relative_path}/tags/{tags.value}" data-value="{tags.value}"><span class="tag-item" data-tag="{tags.value}" style="<!-- IF tags.color -->color: {tags.color};<!-- ENDIF tags.color --><!-- IF tags.bgColor -->background-color: {tags.bgColor};<!-- ENDIF tags.bgColor -->">{tags.value}</span><span class="tag-topic-count">{tags.score}</span></a>
</h3>
<!-- END tags -->
			<!-- ENDIF tags.length -->


<div class="text-center pagination-container<!-- IF !pagination.pages.length --> hidden<!-- ENDIF !pagination.pages.length -->">
	<ul class="pagination">
		<li class="previous pull-left<!-- IF !pagination.prev.active --> disabled<!-- ENDIF !pagination.prev.active -->">
			<a href="?page={pagination.prev.page}" data-page="{pagination.prev.page}"><i class="fa fa-chevron-left"></i> </a>
		</li>

		<!-- BEGIN pages -->
			<li class="page<!-- IF pagination.pages.active --> active<!-- ENDIF pagination.pages.active -->" >
				<a href="?{pagination.pages.qs}" data-page="{pagination.pages.page}">{pagination.pages.page}</a>
			</li>
		<!-- END pages -->

		<li class="next pull-right<!-- IF !pagination.next.active --> disabled<!-- ENDIF !pagination.next.active -->">
			<a href="?page={pagination.next.page}" data-page="{pagination.next.page}"> <i class="fa fa-chevron-right"></i></a>
		</li>
	</ul>
</div>

		</div>
	</div>
</div>
