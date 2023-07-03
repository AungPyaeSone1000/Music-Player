const wrapper = document.getElementsByClassName("wrapper")[0];
const MusicImg = document.getElementsByTagName("img")[0];
const MusicName = document.getElementsByClassName("name")[0];
const MusicArtist = document.getElementsByClassName("artist")[0];
const MainAudio = document.getElementById("main-audio");
const PlayPauseBtn = document.getElementById("play-pause");
const PrevBtn = document.getElementById("prev");
const NextBtn = document.getElementById("next");
const ProgressBar = document.getElementById("progress-bar");

console.log();

let musicIndex = 0;

//Calls loadmusic when the window is loaded
window.addEventListener("load", () =>{
    loadMusic(musicIndex);
});

//Load Music Function
function loadMusic (IndexNum){
    MusicName.innerText = allMusic[IndexNum].name;
    MusicArtist.innerText = allMusic[IndexNum].artist;
    MusicImg.src = "img/"+allMusic[IndexNum].img;
    MainAudio.src = "songs/"+allMusic[IndexNum].src;
    console.log (MainAudio.src);
};

//Play Music FUnction
function PlayMusic(){
    wrapper.classList.add("play");
    PlayPauseBtn.innerText = "pause";
    MainAudio.play();
}

//Pause Music Function
function PauseMusic(){
    wrapper.classList.remove("play");
    PlayPauseBtn.innerText = "play_arrow";
    MainAudio.pause();
}

//Next Song
function NextSong(){
    musicIndex++;
    //Music will go to the first song when the index is greater than the array
    musicIndex >= allMusic.length ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex)
    PlayMusic();
}

//Previous Song
function PrevSong(){
    musicIndex--;
    //Music will gp to the last song when the index is less than 0
    musicIndex < 0 ? musicIndex = allMusic.length-1 : musicIndex = musicIndex;
    loadMusic(musicIndex)
    PlayMusic();
}

//Play or Pause Music 
PlayPauseBtn.addEventListener("click",()=>{
    const MusicPause = wrapper.classList.contains("play");
    MusicPause ? PauseMusic() : PlayMusic();
    
})

NextBtn.addEventListener("click",()=>{
    NextSong();
})

PrevBtn.addEventListener("click",()=>{
    PrevSong();
})

MainAudio.addEventListener("timeupdate",(e)=>{
    const currentTime = e.target.currentTime; //Current Time of the song
    const DurationTime = e.target.duration;//Duration of the song
    let progressWidth = (currentTime/DurationTime) * 100;
    ProgressBar.style.width = progressWidth+"%";
    let musicCurrentTime = document.getElementById("currentTime");
    let musicDuration = document.getElementById("duration");
    MainAudio.addEventListener("loadeddata",()=>{
        //Update Song Duration
        let audioDuration =  MainAudio.duration;
        let totalMin = Math.floor(audioDuration/60);
        let totalSec = Math.floor(audioDuration%60);
        if (totalSec < 10){
            totalSec = "0"+totalSec;
        }
        musicDuration.innerText = totalMin  +":"+totalSec;   
    });
    //Update Song Current Time
    let CurrentMin = Math.floor(currentTime/60);
        let CurrentSec = Math.floor(currentTime%60);
        if (CurrentSec < 10){
            CurrentSec = "0"+CurrentSec;
        }
        musicCurrentTime.innerText = CurrentMin +":"+CurrentSec;
})