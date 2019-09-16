$(document).foundation();

var server_api = "http://dooyeed.com:10080/api";
var session_id = window.location.href.split("#!/")[1];
var qg_api = server_api + "/question-generation?session_id=" + session_id;

$.ajax({
	method: 'get',
	url: qg_api,
	dataType: 'json',
	success: function(data) {
		$("#qg").html("");
		var qg_data = data["qg_data"];
		for (var i = 0; i < qg_data.length; i++) {
			console.log(qg_data[i]["type"]);
			if (qg_data[i]["type"] == "choice") {
				var qg_html = '<fieldset class="large-10 cell"><legend>' + qg_data[i]["question"] + '</legend>';
				for (var j = 0; j < qg_data[i]["wrong_answer"].length; j++) {
					qg_html += '<p><input type="radio" name="q'+i+'" value="wrong_answer" id="q'+i+j+'"><label for="q'+i+j+'">'+qg_data[i]["wrong_answer"][j]+'</label></p>';
				}
				qg_html += '<p><input type="radio" name="q'+i+'" value="right_answer" id="q'+i+'x"><label for="q'+i+'x">'+qg_data[i]["right_answer"]+'</label></p>';
				qg_html += '</fieldset>';
				$("#qg").html($("#qg").html() + qg_html);
			}
		}
	},
	error: function(jqXHR, textStatus, errorThrown) {
		alert('Error: ' + errorThrown);
	}
});


