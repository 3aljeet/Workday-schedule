$(document).ready(function () {
  // Function to display both date and time
  function displayDateTime() {
    var currentDateTime = dayjs().format("dddd, MMMM D, YYYY, h:mm A");
    $("#currentDay").text(currentDateTime);
  }

  // Function to see if a time block is in the past, present, or future
  function hourUpdater() {
    var currentHour = dayjs().hour();

    // Loop over time blocks
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Check if we've moved past this time
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Calling the function to display date and time
  displayDateTime();

  // Calling the function to update time block styles
  hourUpdater();

  // Load saved data from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockHour);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Calling the function to load saved events
  loadEvents();

  // Save user data to local storage when the save button is clicked
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).parent().attr("id");
    var eventDescription = $(this).siblings(".description").val();

    localStorage.setItem(blockHour, eventDescription);
  });

  // Update time every minute
  setInterval(displayDateTime, 60000);
});
