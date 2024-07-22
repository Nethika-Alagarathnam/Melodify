const content = document.querySelector(".content");
const playImage = content.querySelector(".music-image img");
const musicName = content.querySelector(".music-titles .name");
const musicArtist = content.querySelector(".music-titles .artist");
const audio = document.querySelector(".main-song");
const playBtn = content.querySelector(".play-pause");
const playBtnIcon = content.querySelector(".play-pause");
const prevBtn = content.querySelector("#prev");
const nextBtn = content.querySelector("#next");
const progressBar = content.querySelector(".progress-bar");
const progressDetails = content.querySelector(".progress-details");
const repeatBtn = content.querySelector("#repeat");
const shuffleBtn = content.querySelector("#shuffle");

let index = 1;

window.addEventListener("load", () => {
  loadData(index);
  updateTimeDetails(); 
});

function loadData(indexValue) {
  const song = songs[indexValue - 1];
  musicName.innerHTML = song.name;
  musicArtist.innerHTML = song.artist;
  playImage.src = `images/${song.img}.jpg`;
  audio.src = `music/${song.audio}.mp3`;
}

function togglePlayPause() {
  if (content.classList.contains("paused")) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  content.classList.add("paused");
  playBtnIcon.innerHTML = "pause";
  audio.play();
}

function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "play_arrow";
  audio.pause();
}

function nextSong() {
  index = (index % songs.length) + 1;
  loadData(index);
  playSong();
}


function prevSong() {
  index = (index - 2 + songs.length) % songs.length + 1;
  loadData(index);
  playSong();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60).toString().padStart(2, "0");
    const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, "0");
    content.querySelector(".current").innerText = `${currentMinutes}:${currentSeconds}`;

    const finalMinutes = Math.floor(duration / 60).toString().padStart(2, "0");
    const finalSeconds = Math.floor(duration % 60).toString().padStart(2, "0");
    content.querySelector(".final").innerText = `${finalMinutes}:${finalSeconds}`;
  }
}

function seekMusic(e) {
  const progressValue = progressDetails.clientWidth;
  const clickedOffsetX = e.offsetX;
  audio.currentTime = (clickedOffsetX / progressValue) * audio.duration;
}


playBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
repeatBtn.addEventListener("click", () => audio.currentTime = 0);
shuffleBtn.addEventListener("click", () => {
  const randIndex = Math.floor(Math.random() * songs.length) + 1;
  loadData(randIndex);
  playSong();
});
audio.addEventListener("timeupdate", updateProgress);
progressDetails.addEventListener("click", seekMusic);
audio.addEventListener("ended", nextSong);
