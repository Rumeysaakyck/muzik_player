const container = document.querySelector(".container");
const image = document.querySelector("#music_img");
const title = document.querySelector("#music_details .title");
const singer = document.querySelector("#music_details .title .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current_time");
const progressBar = document.querySelector("#progress_bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume_bar");
const ul = document.querySelector("ul");

const player = new Player(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}
play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const prevMusic = () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};
const calculateTime = (totalSeconds) => {
  const minute = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const updateSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const sonuc = `${minute}:${updateSeconds}`;
  return sonuc;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (muteState === "unmuted") {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag =`<li li-index=${i} onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
      <span>${list[i].getName()}</span>
      <span id="music-${i}" class="badge bg-dark rounded-pill "></span>
      <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
    </li>`;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata",()=>{
        liAudioDuration.innerText=calculateTime(liAudioTag.duration);
    });

  }
};

const selectedMusic=(li)=>{
    player.index= li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow =()=>{
    for(let li of ul.querySelectorAll("li")){
        if( li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")== player.index){
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", ()=>{
    nextMusic();
})