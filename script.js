// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
  var saveButtonEl = $('.saveBtn');
  var currentDayEl = $('#currentDay');
  var hour = dayjs().hour();
 

  // Add a listener for click events on the save button.
  saveButtonEl.on('click', function() {
    var time = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    localStorage.setItem(time, description);
  });

  function applyTimeClasses() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id"));
      console.log(blockHour);
      if (blockHour > hour) {
        $(this).addClass("future");
      } else if (blockHour === hour) {
        $(this).addClass("present");
      } else if (blockHour < hour) {
        $(this).addClass("past");
      }
      console.log(hour);
    });
  }

  // Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  function loadSavedDescriptions() {
    $(".time-block").each(function() {
      var timeBlock = $(this);
      var time = timeBlock.attr("id");
      var description = localStorage.getItem(time);
      timeBlock.find('.description').val(description);
    });
  }

  // Display the current date in the header of the page.
  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    currentDayEl.text(rightNow);
  }

  // Call the necessary functions to initialize the page.
  applyTimeClasses();
  loadSavedDescriptions();
  displayTime();
  applyTimeClasses();
 
});