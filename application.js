$(document).ready(function() {
	$("#search").on('keyup', function() {
		if($('.tweetles').show()){
			$('.tweetles').hide();
		}
		$('.tweetles').contains($(this).val()).show();
	});
});