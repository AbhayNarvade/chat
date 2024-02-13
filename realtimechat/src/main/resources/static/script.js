$(document).ready((e) => {
    // alert("Test")

    $("#login").click(() => {
        let name = $("#name-value").val();
        localStorage.setItem("name", name);
        connect(() => {
            $("#name").addClass("d-none");
            $("#Chatroom").removeClass("d-none");

            // subscribe 
            stompclient.subscribe("/topic/return-to", function (res) {
                showMessage(JSON.parse(res.body));
            });
        });
    });

    $("#Send").click(() => {
        sendmessage();
    });


    $("#logout").click(()=>{
        localStorage.removeItem("name");
        if(stompclient!==null){
            stompclient.disconnect();
            $("#name").removeClass("d-none");
            $("#Chatroom").addClass("d-none");
        }
    })
});

var stompclient = null;

// connect function
function connect(callback) {
    let socket = new SockJS("/server1");
    stompclient = Stomp.over(socket);
    stompclient.connect({}, function (frame) {
        console.log("connected : " + frame);
        callback(); // Execute the callback function once connected
    });
}

function showMessage(message) {
    $("#message-container tbody").append(`<tr class="p-3"><td ><b>${message.name}:</b> ${message.content}</td></tr>`);
}

// send message
function sendmessage() {
    if (stompclient && stompclient.connected) {
        let jsonob = {
            name: localStorage.getItem("name"),
            content: $("#message-value").val()
        };
        stompclient.send("/app/message", {}, JSON.stringify(jsonob));
    } else {
        console.error("WebSocket connection not established.");
    }
}
