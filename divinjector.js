/**
 * 
 * 
 */


var search = $('#gbqfq').val();

$(function() {

	$("#gsr").append("<div id='haystack'></div>");

	$.post("http://localhost/step1.php", {
		query : search
	}, function(data, status) {

		var obj = $.parseJSON(data);

		var items = [];

		if (obj.type == "domain") {

			//alert("need step 2");
			$.each(obj.options, function(key, val) {

				items.push("<a id='hay" + key + "' href='#' ><li>" + val
						+ "</li></a>");

				// alert(key);

			});

			$("<ul/>", {
				"class" : "my-new-list",
				html : items.join("")
			}).appendTo("div#haystack");

			$.each(obj.options, function(key, val) {
				$("#hay" + key).on(
						"click",
						function() {

							$("div#haystack").html("");

							$.post("http://localhost/step2.php", {
								query : search,
								domain : val
							}, function(data, status) {
								var obj2 = $.parseJSON(data);
								//alert(obj2.type);

								var items = [];

								if (obj2.type == "search") {

									$.each(obj2.options, function(key2, val2) {
										items.push("<a id='hay" + key2
												+ "' href='#'><li>" + val2 + "</li></a>");
									});

									$("<ul/>", {
										"class" : "my-new-list",
										html : items.join("")
									}).appendTo("div#haystack");
									
									$.each(obj2.options, function(key2, val2) {
										$("#hay" + key2).on(
												"click",
												function() {
													
													//alert(val2);
													$('#gbqfq').val(val2);
													$( "#gbqf" ).submit();
												});
									});

								}
							});

						});
			});

		} else {

		}

	});

});
