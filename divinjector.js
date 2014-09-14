/**
 * 
 * 
 */


var search = $('#gbqfq').val();

$(function() {

	$("#gsr").append("<div id='haystack'>Pick one of these guys</div>");

	$.post("http://localhost/step1.php", {
		query : search
	}, function(data, status) {

		var obj = $.parseJSON(data);

		var items = [];

		if (obj.type == "domain") {

			$.each(obj.options, function(key, val) {

				items.push("<a class='list-group-item' id='hay" + key + "' href='#' ><li>" + val
						+ "</li></a>");

			});

			$("<ul/>", {
				"class" : "my-new-list",
				html : items.join("")
			}).appendTo("div#haystack");
			
			$("#haystack").append("<div style='float:right;background:transparent;'><small>Haystack!</small></div>");

			$.each(obj.options, function(key, val) {
				$("#hay" + key).on(
						"click",
						function() {

							$("div#haystack").html("Here you go");

							$.post("http://localhost/step2.php", {
								query : search,
								domain : val
							}, function(data, status) {
								var obj2 = $.parseJSON(data);
								//alert(obj2.type);

								var items = [];

								if (obj2.type == "search") {

									$.each(obj2.options, function(key2, val2) {
										items.push("<a  class='list-group-item' id='hay" + key2
												+ "' href='#'><li>" + val2 + "</li></a>");
									});

									$("<ul/>", {
										"class" : "my-new-list",
										html : items.join("")
									}).appendTo("div#haystack");
									
									$("#haystack").append("<div style='float:right;background:transparent;'><small>Haystack!</small></div>");
									
									$.each(obj2.options, function(key2, val2) {
										$("#hay" + key2).on(
												"click",
												function() {
											
													$('#gbqfq').val(val2);
													$( "#gbqf" ).submit();
												});
									});

								}
							});
							
							

						});
			});

		} else {
			$.each(obj.options, function(key1, val) {
				items.push("<a  class='list-group-item' id='hay" + key
						+ "' href='#'><li>" + val + "</li></a>");
			});

			$("<ul/>", {
				"class" : "my-new-list",
				html : items.join("")
			}).appendTo("div#haystack");
			
			$("#haystack").append("<div style='float:right;background:transparent;'><small>Haystack!</small></div>");
			
			$.each(obj.options, function(key, val) {
				$("#hay" + key).on(
						"click",
						function() {
					
							$('#gbqfq').val(val);
							$( "#gbqf" ).submit();
						});
			});
		}

	});

});
