
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
    //filter through data.results[i]///
      //for if contains text append 
debugger

      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text !== undefined) {
          $('#chats').append(`<div> ${app.styleMessage(data.results[i])} </div>`);
          
        }
      }
    
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.styleMessage = function(object) {
  var str = '<div class ="chatMessage">';
  str += `<span class="time"> ${object.createdAt} </span>`; 
  str += `<span class="roomname"> ${object.roomname} <span>`;
  str += `<span class="chatText"> ${object.text} <span>`;
  str += `<span class="time"> ${object.updatedAt} <span>`;
  str += `<span class="username"> ${object.username} <span>`;
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
  $('#roomSelect').append(`<option>${room}</option>`);
};



app.handleUsernameClick = function(event) {
  $('.friendlist').append(`<div> ${$('.username').data()} </div>`);
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
  app.fetch();
  $('.username').on('click', app.handleUsernameClick());
  //$('button').on('click', app.handleSubmit());
};

app.init();

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

