
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
debugger
      for (var i = 0; i < data.results.length; i++) {
        var escapedUsername = data.results[i].username;
        var escapedMessage = data.results[i].text; 
        var escapedTime = data.results[i].createdAt;
        var escapedTime = data.results[i].updatedAt;
        var escapedRoom = data.results[i].roomname;
        
        if (data.results[i].text !== undefined) {

          $('#chats').append(`<div> ${app.styleMessage(data.results[i])} </div>`);
          if (escapedRoom !== undefined && 
          !rooms.includes(escapedRoom) && 
          escapedRoom !== '') {
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
      // var dataString = JSON.stringify(data);
      dataString.split('<script>').join('');
      dataString.split('</script>').join('');
      dataString.split('&').join('');
      dataString.split('<').join('');
      dataString.split('>').join('');
      dataString.split('/').join('');
      dataString.split('+').join('');
      dataString.split('-').join('');
      dataString = JSON.parse(dataString);
    return dataString;
};

app.styleMessage = function(object) {
  var str = `<div class = \"chatMessage ${object.roomname} \">`;
  str += `<span class="roomname"> ROOM:${object.roomname} <span>`;
  str += `<span class="username"><b> ${object.username} : </b><span>`;
  str += `<span class="chatText"> ${object.text} <span>`;

  if (object.updatedAt === undefined) {
    str += `<span class="time"> ${object.createdAt} </span>`;
  } else {
    str += `<span class="time">edited ${object.updatedAt} <span>`;
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

app.handleUsernameClick = function(event) {
  $('.friendlist').append(`<div> ${$('.username')} </div>`);
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




  
 
  //$('button').on('click', app.handleSubmit());
};

app.init();

$(document).ready(function() {
  $('.username').on('click', app.handleUsernameClick);
  app.handleDisplayMessage($("#roomSelect option:selected").text());
});


var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

