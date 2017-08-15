var users = [
	"freecodecamp",
    "playoverwatch",
    "playoverwatch_kr",
    "blizzardzhtw",
    "sacriel",
    "blizzheroes",
    "sing_sing",
    "ddahyoni",
    "imaqtpie",
    "eulcs1",
    "freakazoid",
    "esl_csgo",
    "kixstar"
];
$(document).ready(function () {
    $('li').on('click', function () {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('id') == 'online') {
            $('.offline').hide();
            $('.online').show();
        } else if ($(this).attr('id') == 'offline') {
            $('.online').hide();
            $('.offline').show();
        } else {
            $('.online, .offline').show();
        }
    })

    var url = "https://wind-bow.gomix.me/twitch-api/";
    var requestType = [
        "users/",
        "channels/",
        "streams/"
    ]
    var cb = "?format=json&callback=?";

    function callTwitch(reqType, user) {
        $.ajax({
            url: url + reqType + user + cb,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data, status, jqXHR) {
                if (reqType == requestType[1]) {
                    $(".results").append(`
                	<a href="${data.url}"><section 
                							id="${data.name}" 
                							class="flexResults">
                		<img src="${data.logo}" 
                			 width="100" height="100">
                		<div>
                			<h4>${data.display_name}</h4>
                			<p>${data.status}</p>
                		</div>
                	</section></a>
                	`)
                }
                if (reqType == requestType[2]) {
                    if (data.stream !== null) {
                        $("#" + user).addClass("online");
                    } else {
                        $("#" + user).addClass("offline");
                    }
                }
            }
        })
    }
    users.map(function (name) {
        callTwitch(requestType[1], name) // map data   
        return name;
    }).map(function (name2) {
        callTwitch(requestType[2], name2) // determine status
    })
})