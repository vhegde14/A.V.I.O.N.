let input;
var currentTemp;
var weatherkey = config.OWM_KEY;
var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=' + weatherkey;

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

let weather = fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        currentTemp = data['main']['temp'];
        //if (currentTemp)
        document.getElementById("weather-display").innerHTML = currentTemp + "° F";
    });

function updateConversation() {
    input = document.getElementById("userInput").value;
    let output = document.getElementById("scroll-panel");
    output.innerHTML += "<p>";
    input = input.toLowerCase();
    output.innerHTML += "<p id='user-input-line'>" + input + "</p>";
    if (input.includes("how are you")) {
        output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "I'm doing good, how about yourself?" + "</p>";
        input = document.getElementById("userInput").value.toLowerCase();
        if (input.includes("good")) {
            output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "That's great to hear!" + "</p>";
        }
    }
    else if (input.includes("hi") || input.includes("hey") || input.includes("hello") || input.includes("what's up")) {
        output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "Hey there!" + "</p>";
    }
    else if (input.includes("name")) {
        output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "I'm AVION, your personal assistant!" + "</p>";
    }
    else if (input.includes("weather")) {
        fetch(weatherURL)
            .then(response => response.json())
            .then(data => {
                var temp = data['main']['temp'];
                output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "The weather right now feels like about " + temp + "° F" + "</p>";
            });
    }
    else {
        output.innerHTML += "<p class='typewriter' id='response-output-line'>" + "Sorry I didn't understand that. Please try a command I do understand!" + "</p>";
    }
    output.innerHTML += "</p>"
    document.getElementById("userInput").value = "";

    var chatHistory = document.getElementById("scroll-panel");
    chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
}




const greetings =  ['Hey there!', 'Hi!', 'Hello there!'];
const howDoings = ['I\'m doing great! How about you?', 'Hanging in there!', 'Fantastic, and how about yourself?'];

function speechConversation() {
    document.getElementById("listening").style.display = "block";
    try {
        speechRecognition.start();
    } catch (error) {
        alert("Your brower is currently not capable of performing this function");
    }
}

let startButton = document.getElementById("talk");
let stopButton = document.getElementById("stop");

let speechRecognition = new webkitSpeechRecognition();

speechRecognition.onstart = () => {
    document.getElementById("listening").style.color = "rgb(224, 83, 83)";
};

speechRecognition.onError = () => {
    document.getElementById("listening").style.color = "rgb(26, 26, 26)";
};

speechRecognition.onresult = (event) => {
    document.getElementById("listening").style.color = "rgb(26, 26, 26)";
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    let output = document.getElementById("scroll-panel");
    output.innerHTML += "<p class='typewriter' id='user-input-line'>" + transcript + "</p>";
    output.innerHTML += "<p class='typewriter' id='response-output-line'>" + respond(transcript); + "</p>";
};

function respond(input) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'Sorry I didn\'t understand that. Please try a command I do understand!';

    if (input.includes("hi") || input.includes("hey") || input.includes("hello") || input.includes("what's up")) {
        speech.text = greetings[Math.floor(Math.random() * greetings.length)];
        returnText = speech.text;
    } else if (input.includes("how are you")) {
        speech.text = howDoings[Math.floor(Math.random() * greetings.length)];
        returnText = speech.text;
    } else if (input.includes("weather")) {
        var temp;
        fetch(weatherURL)
            .then(response => response.json())
            .then(data => {
                temp = data['main']['temp'];
                console.log("here");
            });
        speech.text = 'The weather right now feels like about' + temp + 'degrees Farenheit';
        returnText = "The weather right now feels like about " + temp + "° F";
    }
    
    speech.volume = 0.7;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    return returnText;
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