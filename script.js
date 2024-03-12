var soundcloudPlayer = document.getElementById('soundcloud-player');
var isPlaying = false;
const progressBar = document.getElementById("progress");

  function togglePlay() {
    let playIcon = document.querySelector('.playIcon');
  
    if (isPlaying) {

      soundcloudPlayer.contentWindow.postMessage('{"method":"pause"}', '*');
      playIcon.innerHTML = `<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>`;
      isPlaying = false;

    } else {

      soundcloudPlayer.contentWindow.postMessage('{"method":"play"}', '*');
      playIcon.innerHTML = `<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>`;
      isPlaying = true;

    }
  }

// Function to update progress bar based on current playback time
function updateProgressBar() {
    // Get the SoundCloud widget object
    const soundcloudWidget = SC.Widget(soundcloudPlayer);
    // Get the current playback position
    soundcloudWidget.getPosition(function(position) {
      // Get the current duration
      soundcloudWidget.getDuration(function(duration) {
        // Calculate the progress percentage
        const progress = (position / duration) * 100;
        // Update the progress bar value
        progressBar.value = progress;
      });
    });
  }

  // Call the updateProgressBar function every second
  setInterval(updateProgressBar, 1000);

  // Event listener for range input change
  progressBar.addEventListener("input", function() {
    // Get the SoundCloud widget object
    const soundcloudWidget = SC.Widget(soundcloudPlayer);
    // Get the duration of the track
    soundcloudWidget.getDuration(function(duration) {
      // Calculate the seek position based on the range input value
      const seekPosition = (progressBar.value / 100) * duration;
      // Seek to the calculated position
      soundcloudWidget.seekTo(seekPosition);
    });
  });



  function fetchDurations() {
    var startDurationElement = document.getElementById('startDuration');
    var endDurationElement = document.getElementById('endDuration');
  
    // Check if the SoundCloud iframe exists
    if (soundcloudPlayer) {
      // Get the SoundCloud widget object
      const soundcloudWidget = SC.Widget(soundcloudPlayer);
  
      // Interval to update start and end durations every second
      var interval = setInterval(function() {
        // Get current playback time
        soundcloudWidget.getPosition(function(currentTime) {
          // Update start duration element
          if (!isNaN(currentTime)) {
            var minutes = Math.floor(currentTime / 60000);
            var seconds = ((currentTime % 60000) / 1000).toFixed(0);
            startDurationElement.textContent = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
          }
        });
  
        // Get the duration of the track
        soundcloudWidget.getDuration(function(duration) {
          // Update end duration element
          if (!isNaN(duration)) {
            var minutes = Math.floor(duration / 60000);
            var seconds = ((duration % 60000) / 1000).toFixed(0);
            endDurationElement.textContent = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
          }
        });
      }, 1000); // Update every second
    }
  }
  
  // Call the function when the window loads
  window.onload = fetchDurations;