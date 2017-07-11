$(document).ready(function(){
  $("#progressBar, #pauseButton, #resumeButton, #resetButton").hide();
  //Declaring variables for Top buttons
  var breakButtonDisplay = parseInt($("#breakNumberDisplay").html());
  var sessionButtonDisplay = parseInt($("#sessionNumberDisplay").html());
  //FUNCTIONS TO CONTROL PLUS AND MINUS BUTTONS
  $("#minusBreakButton").click(function(){
    if(breakButtonDisplay>1){
      breakButtonDisplay--;
      $("#breakNumberDisplay").html(breakButtonDisplay);
    }
  });//end of minus break button
  $("#addBreakButton").click(function(){
      breakButtonDisplay++;
      $("#breakNumberDisplay").html(breakButtonDisplay);
  });//end of Break Buttons
  //Start of Session Buttons
  $("#minusSessionButton").click(function(){
    if(sessionButtonDisplay>1){
      sessionButtonDisplay--;
      $("#sessionNumberDisplay, #displayTime").html(sessionButtonDisplay);
    }
  });//end of minus break button
  $("#addSessionButton").click(function(){
      sessionButtonDisplay++;
      $("#sessionNumberDisplay, #displayTime").html(sessionButtonDisplay);
  });//end of SESSION plus and minus buttons
  
  //VARIABLES FOR TIMER COUNTDOWN
  var sessionCountdown;
  var breakCountdown;
  var sessionDisplayNumber;
  var minutes;
  var seconds;
  var toggleStart = 'session';
  var increment;
  var height =0;
  var myAudio = new Audio("https://clyp.it/1gg5zr4z.mp3");
  $("#startButton").click(function(){
    $("#startButton").hide();
    $("#pauseButton, #resetButton").show();
    $("#startButton").removeClass("col-xs-12").addClass("col-xs-5"); 
    $("#minusSessionButton, #addSessionButton").prop("disabled", true);
        
        sessionDisplayNumber = sessionButtonDisplay*60;
        increment = 100/sessionDisplayNumber;
        minutes = parseInt(sessionDisplayNumber/60, 10);
        seconds = parseInt(sessionDisplayNumber%60, 10);
        minutes = minutes<10 ? "0"+minutes : minutes;
        seconds = seconds<10 ? "0" +seconds: seconds;
        $("#displayTime").html(minutes+":"+seconds);
        $("#displayname").html("Session");
        sessionCountdown = setInterval(startSessionTick, 1000);
    
  });//end of startButton
  function startSessionTick(){
    if(sessionDisplayNumber === 0){
      myAudio.play();
      clearInterval(sessionCountdown);
      height = 0;
      $("#timer").css("border-color", "#d43f3a");
      $("#filler").css("background-color", "rgba(212, 63, 58, 0.4)").css("height", "0");
      
      $("#minusBreakButton, #addBreakButton").prop("disabled", true);
        sessionDisplayNumber = breakButtonDisplay*60;
        increment = 100/sessionDisplayNumber;
        minutes = parseInt(sessionDisplayNumber/60, 10);
        seconds = parseInt(sessionDisplayNumber%60, 10);
        minutes = minutes<10 ? "0"+minutes : minutes;
        seconds = seconds<10 ? "0" +seconds: seconds;
        $("#displayTime").html(minutes+":"+seconds);
        $("#displayName").html("Break");
      toggleStart = 'break';
        breakCountdown = setInterval(startBreakTick, 1000);
    }
    else{
      sessionDisplayNumber--;
      height += increment;
      minutes = parseInt(sessionDisplayNumber/60, 10);
        seconds = parseInt(sessionDisplayNumber%60, 10);
        minutes = minutes<10 ? "0"+minutes : minutes;
        seconds = seconds<10 ? "0" +seconds: seconds;
        $("#displayTime").html(minutes+":"+seconds);
        $("#filler").css("height", height+"%");
    }
  }//end function
  function startBreakTick(){
    if(sessionDisplayNumber === 0){
      myAudio.play();
      clearInterval(breakCountdown);
      toggleStart='session';
      $("#pauseButton, #startButton, #resumeButton").hide();
      $("#resetButton").removeClass("col-xs-5").addClass("col-xs-12");  
    }
    else{
      sessionDisplayNumber--;
      height += increment;
      minutes = parseInt(sessionDisplayNumber/60, 10);
        seconds = parseInt(sessionDisplayNumber%60, 10);
        minutes = minutes<10 ? "0"+minutes : minutes;
        seconds = seconds<10 ? "0" +seconds: seconds;
        $("#displayTime").html(minutes+":"+seconds);
        $("#filler").css("height", height+"%");
    }
  };//end function
  
  $("#pauseButton").click(function(){
    if(toggleStart === 'session'){
      clearInterval(sessionCountdown);
    }
    else if(toggleStart === 'break'){
      clearInterval(breakCountdown);
    }
    
    $("#resumeButton").show();
    $("#pauseButton").hide();
  });//end function
  $("#resumeButton").click(function(){
    if(toggleStart === 'session'){
      sessionCountdown = setInterval(startSessionTick, 1000);
    }
    else if(toggleStart === 'break'){
      breakCountdown = setInterval(startBreakTick, 1000);
    }
    $("#resumeButton").hide();
    $("#pauseButton").show();
  });// end resume function
  $("#resetButton").click(function(){
    $("#resumeButton,#pauseButton").hide();
    $("#startButton").show();
    clearInterval(sessionCountdown);
    clearInterval(breakCountdown);
    breakButtonDisplay = parseInt($("#breakNumberDisplay").html());
    sessionButtonDisplay = parseInt($("#sessionNumberDisplay").html());
    $("#displayName").html("Session");
    $("#displayTime").html(sessionButtonDisplay);
    $("#minusSessionButton, #addSessionButton, #minusBreakButton,     #addBreakButton").prop("disabled", false);
    $("#pauseButton, #resumeButton, #resetButton").hide();
    $("#startButton").removeClass("col-xs-5").addClass("col-xs-12");
      $("#resetButton").removeClass("col-xs-12").addClass("col-xs-5");
    $("#timer").css("border-color", "#46b8da");
    height = 0;
    $("#filler").css("height", height+"%").css("background-color", "rgba(70, 184, 218, 0.4)");
  }); //end reset Button
});//End of document