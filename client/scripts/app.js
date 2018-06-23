
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
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
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

app.handleSubmit =  function() {
  message.username = "username";
  message.roomname = $('#roomSelect');
  message.text = $('#message').val();
  app.send(message);
}


app.init = function() {
  $('.username').on('click', app.handleUsernameClick());
  $('button').on('click', app.handleSubmit());
};

// $(document).ready(function() {
//   $('.username').on('click', function() {
//     $('.username').append('<p>friend added!</p>');
//   //   //console.log('hello');
//   });

//   });
// });


var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

