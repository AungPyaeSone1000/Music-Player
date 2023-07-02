const wrapper = document.getElementsByClassName("wrapper")[0];
const MusicImg = document.getElementsByTagName("img")[0];
const MusicName = document.getElementsByClassName("name")[0];
const MusicArtist = document.getElementsByClassName("artist")[0];
const MainAudio = document.getElementById("main-audio");
const PlayPauseBtn = document.getElementById("play-pause");
const PrevBtn = document.getElementById("prev");
const NextBtn = document.getElementById("next");


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
    wrapper.classList.add("paused");
    PlayPauseBtn.innerText = "pause";
    MainAudio.play();
}

//Pause Music Function
function PauseMusic(){
    wrapper.classList.remove("paused");
    PlayPauseBtn.innerText = "play_arrow";
    MainAudio.pause();
}

//Next Song
function NextSong(){
    musicIndex++;
    loadMusic(musicIndex)
    PlayMusic();
}

//Previous Song
function PrevSong(){
    musicIndex--;
    loadMusic(musicIndex)
    PlayMusic();
}

//Play or Pause Music 
PlayPauseBtn.addEventListener("click",()=>{
    const MusicPause = wrapper.classList.contains("paused");
    MusicPause ? PauseMusic() : PlayMusic();
    
})

NextBtn.addEventListener("click",()=>{
    NextSong();
})

PrevBtn.addEventListener("click",()=>{
    PrevSong();
})