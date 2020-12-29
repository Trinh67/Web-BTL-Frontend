var source = new EventSource('https://localhost:44394/api/Notification/');  
  
source.onmessage = function (e) {  
    var data = e.data.split('|');  
    var username = $("<strong></strong>").text(data[0] + " : ");  
    var text = $("<i></i>").text(data[1]);  
    var dt = $("<div></div>").text(data[2]);  
    var chatTemp = document.createElement("p");  
    chatTemp.append(dt[0], username[0], text[0], document.createElement("br"));  
    $('#chatTemplate').append(chatTemp);  

    console.log('okkk');
}; 