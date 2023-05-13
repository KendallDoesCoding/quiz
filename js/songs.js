var songs = [
    "/music/apc.mp3",
    "/music/beachvibes.mp3",
    "/music/bliss.mp3",
    "/music/Fluffing-a-Duck.mp3",
    "/music/happyafricanvillage.mp3",
    "/music/happyandjoyfulchildren.mp3",
    "/music/newlands.mp3",
    "/music/sotb.mp3",
    "/music/tropicalfever.mp3",
    "/music/tropicalsoul.mp3",
    "/music/ukulele.mp3",
  ];

  var audioElement = document.getElementById('my_audio');
  var musicOnButton = document.getElementById('musicOnButton');

  function playMusic() {
    var randomIndex = Math.floor(Math.random() * songs.length);
    var audioSource = document.getElementById('audio_source');
    audioSource.src = songs[randomIndex];
    audioElement.load();

    audioElement.addEventListener('canplaythrough', function() {
      audioElement.play().catch(function(error) {
        console.log('Error playing audio:', error);
        pauseMusic();
      });
      musicOnButton.style.display = 'none';
    }, { once: true });

    audioElement.addEventListener('pause', function() {
      musicOnButton.style.display = 'block';
    });
  }

  function pauseMusic() {
    audioElement.pause();
    musicOnButton.style.display = 'block';
  }

  function toggleMusic() {
    if (audioElement.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  // Play music on page load
  window.addEventListener('load', function() {
    playMusic();
  });