//var gepornot = document.getElementById("gepornot");
//var selected_type = gepornot.options[gepornot.selectedIndex].text;

function gepOrNotSelect() {
    $.ajax({
        type: "POST",
        url: "/select",
        data: JSON.stringify({
            "gepordept" : $('#gepornot').val()
        }),
        contentType: "application/json;charset=UTF-8",
        success: function(response) {
            document.write(response)
        }
    })
}