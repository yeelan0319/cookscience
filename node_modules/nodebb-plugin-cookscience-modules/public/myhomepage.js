"use strict";

$(window).on('action:ajaxify.end', function(event, data){
	if(data.url === ""){
		var searchInput = $('#search-input');
		searchInput.focus();
		searchInput.keydown(doSearch);
		$('#search-btn').click(doSearch);
		
		require(['composer'], function(composer) {
			$('#new-topic').click(function(){
				composer.newTopic(0);
			});
		});
	}
});

function doSearch(event){
	if(event.keyCode==13){
		var query = $('#search-input').val();
		$('#search-form').find('input').val(query);
		$('#search-form').submit();
	}
}


// custom user profile
$(window).on('action:profile.update', function(event, userData, next){
	userData.institution = $('#inputInstitution').val();
	userData.lab = $('#inputLab').val();
	userData.discipline = [];
	$("input[name='discipline_group[]']:checked").each(function() {
	  	userData.discipline.push($(this).val());
	});
	userData.discipline = userData.discipline.join(",");
	userData.receiveAd = $("input[name='receiveAd']").prop('checked');
	next(userData);
})