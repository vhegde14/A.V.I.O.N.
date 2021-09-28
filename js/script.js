let input;

function display_count() {
    var date = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date_displayed = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    let hours;
    if (date.getHours() > 12) {
        hours = date.getHours() - 12;
    } else if (date.getHours() == 0) {
        hours = 12;
    } else {
        hours = date.getHours();
    }
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var time_displayed = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    document.getElementById("date-display").innerHTML = date_displayed;
    document.getElementById("time-display").innerHTML = time_displayed;
    displayClock();
    displayGreeting();
}

function displayClock() {
    var refresh = 1000;
    mytime = setTimeout('display_count()', refresh);
}

function displayGreeting() {
    var time_current = new Date();
    let greeting = document.getElementById("greeting");
    if (time_current.getHours() >= 2 && time_current.getHours() < 12) {
        greeting.innerHTML = "Good Morning";
    }
    else if (time_current.getHours() >= 12 && time_current.getHours() < 17) {
        greeting.innerHTML = "Good Afternoon";
    }
    else if (time_current.getHours() >= 17 || time_current.getHours() < 2) {
        greeting.innerHTML = "Good Evening";
    }
}

function updateConversation() {
    input = document.getElementById("userInput").value;
    let output = document.getElementById("scroll-panel");
    output.innerHTML += "<p>";
    input = input.toLowerCase();
    output.innerHTML += "<p id='user-input-line'>" + input + "</p>";
    if (input.includes("how are you")) {
        output.innerHTML += "<p id='response-output-line'>" + "I'm doing good, how about yourself?" + "</p>";
        input = document.getElementById("userInput").value.toLowerCase();
        if (input.includes("good")) {
            output.innerHTML += "<p id='response-output-line'>" + "That's great to hear!" + "</p>";   
        }
    }
    else if (input.includes("hi") || input.includes("hey") || input.includes("hello")) {
        output.innerHTML += "<p id='response-output-line'>" + "Hey there!" + "</p>";
    }
    else if (input.includes("name")) {
        output.innerHTML += "<p id='response-output-line'>" + "I'm AVION, your personal assistant!" + "</p>";
    }
    else {
        output.innerHTML += "<p id='response-output-line'>" + "Sorry I didn't understand that. Please try a command I do understand!" + "</p>";
    }
    output.innerHTML += "</p>"
    document.getElementById("userInput").value = "";

    var chatHistory = document.getElementById("scroll-panel");
    chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
}

function scrollOnClick() {
    /*$(document).ready(function(){
        // Add smooth scrolling to all links
        $("a").on('click', function(event) {
      
          // Make sure this.hash has a value before overriding default behavior
          if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
      
            // Store hash
            var hash = this.hash;
      
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 800, function(){
      
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            });
          }
        });
      }); */
}