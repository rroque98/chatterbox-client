
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    //
    contentType: 'application/json',
    success: function (data) {
    
      // check if dataString contains certain chars
      // if yes, splice those chars out


      // var xssEscape = require('xss-escape');
      // var escapedData = xssEscape(data);      
      // data = JSON.parse(escapedData);

      var rooms = [];
// debugger;
      for (var i = 0; i < data.results.length; i++) {
        var escapedUsername = app.escapeString(data.results[i].username);
        var escapedMessage = app.escapeString(data.results[i].text); 
        var escapedTime = app.escapeString(data.results[i].createdAt);
        var escapedTime = app.escapeString(data.results[i].updatedAt);
        var escapedRoom = app.escapeString(data.results[i].roomname);
        
        if (data.results[i].text !== undefined) {

          $('#chats').append(`<div> ${app.styleMessage(data.results[i])} </div>`);
          if (escapedRoom !== undefined && !rooms.includes(escapedRoom) && escapedRoom !== '') {
            app.renderRoom(escapedRoom);
            rooms.push(escapedRoom);
          }
        }
      }
    
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.escapeString = function(dataString) {
  if (dataString !== undefined) {
    dataString = dataString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }
  return dataString;
  
    //   // var dataString = JSON.stringify(data);
    //   // dataString.split('<script>').join('');
    //   // dataString.split('</script>').join('');
    //   // dataString.split('&').join('');
    //   dataString.split('<').join('');
    //   dataString.split('>').join('');
    //   // dataString.split('/').join('');
    //   // dataString.split('+').join('');
    //   // dataString.split('-').join('');
    //   dataString = JSON.parse(dataString);
    // }
    // return dataString;
};

app.styleMessage = function(object) {
  var str = `<div class = \"chatMessage ${app.escapeString(object.roomname)} \">`;
  str += `<span class="roomname"> ROOM:${app.escapeString(object.roomname)} </span>`;
  str += `<span class="username"><b> ${app.escapeString(object.username)} : </b>/<span>`;
  str += `<span class="chatText"> ${app.escapeString(object.text)} </span>`;

  if (app.escapeString(object.updatedAt) === undefined) {
    str += `<span class="time"> ${app.escapeString(object.createdAt)} </span>`;
  } else {
    str += `<span class="time">edited ${app.escapeString(object.updatedAt)} </span>`;
  }
  str += "</div>";
  return str;
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  $('#chats').append(`<div class="message"><div class="username" 
data-username="${message.username}">${message.username}:</div> ${message.text} </div>`);
};

app.renderRoom = function(room) { 
  $('#roomSelect').append(`"<option value="${room}">${room}</option>"`);
};

app.handleDisplayMessage = function(roomname) {
  $(".chatMessage").hide();
  $("." + roomname).show();
}

app.handleUsernameClick = function(user) {
debugger;
  $('.friendlist').append(`<div> ${user} </div>`);
};

app.handleSubmit = function() {
  message.username = window.location.search.slice(window.location.search.indexOf('=') + 1);
  message.roomname = $('#roomSelect');
  message.text = $('#message').val();
  app.send(message);
};

app.getUsername = function() {
  var currentUsername = window.location.search.slice(window.location.search.indexOf('=') + 1);
  return currentUsername;
};


app.init = function() {

  
  setInterval(app.fetch(), 5000);


 //app.handleDisplayMessage($("#roomSelect option:selected").text());

  
 
};

app.init();

$(document).ready(function() {
  $("#roomSelect").on('change', function() {
    app.handleDisplayMessage($("#roomSelect option:selected").text());
  });
  $(document).on('click', ".username", function(event) {
    app.handleUsernameClick( $(".username").text() );
  });
  $(document).on('click', "button", function(event) {
    var message = {
      username: app.getUsername(), 
      text: $('#message').val(),
      roomname: $(".roomname").text(),
    };
    app.send(message);
  });
  //$('button').on('click', app.handleSubmit());
});

app.generateSendMessage = function(message) {
  
};



