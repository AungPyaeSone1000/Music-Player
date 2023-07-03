const wrapper = document.getElementsByClassName("wrapper")[0];
const MusicImg = document.getElementsByTagName("img")[0];
const MusicName = document.getElementsByClassName("name")[0];
const MusicArtist = document.getElementsByClassName("artist")[0];
const MainAudio = document.getElementById("main-audio");
const PlayPauseBtn = document.getElementById("play-pause");
const PrevBtn = document.getElementById("prev");
const NextBtn = document.getElementById("next");
const ProgressArea = document.getElementById("progress-area");
const ProgressBar = document.getElementById("progress-bar");
const RepeatBtn = document.getElementById("repeat");
const MusicList = document.getElementsByClassName("music-list")[0];
const QueueBtn = document.getElementById("queue");
const HideQueueBtn = document.getElementById("close");
const ulTag = document.getElementsByTagName("ul")[0];

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

//Time Indicators 
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
});

//Progress Bar Functionality
ProgressArea.addEventListener("click",(e)=>{
    let progressAreaWidthValue = ProgressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let duration = MainAudio.duration;
    MainAudio.currentTime = (clickedOffSetX/progressAreaWidthValue) * duration;
    PlayMusic();
});

//Repeat Button Icon 
RepeatBtn.addEventListener("click",()=>{
    let icon = RepeatBtn.innerText;
    switch(icon){
        case "repeat":
            RepeatBtn.innerText = "repeat_one";
            RepeatBtn.setAttribute("title","Repeat One");
            break;
        case "repeat_one":
            RepeatBtn.innerText = "shuffle"; 
            RepeatBtn.setAttribute("title","Shuffle");
            break;
        case "shuffle":
            RepeatBtn.innerText = "repeat";
            RepeatBtn.setAttribute("title","Repeat");
            break;
        
    }
});

//Repeat Button Functionality 
//Reminder to add repeat function to next btn
MainAudio.addEventListener("ended",()=>{
    let icon = RepeatBtn.innerText;
    switch(icon){
        case "repeat":
            NextSong();
            break;
        case "repeat_one":
            MainAudio.currentTime = 0;
            loadMusic(musicIndex)
            PlayMusic();
            break;
        case "shuffle":
            let randIndex = RandomNum(0,allMusic.length);
            if (randIndex == musicIndex){
                randIndex++;
            }
            loadMusic(randIndex);
            PlayMusic();
            break;
    }
})

//Random Number Generator
function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//Toggle Queue List
QueueBtn.addEventListener("click",()=>{
    MusicList.classList.toggle("show");
});
HideQueueBtn.addEventListener("click",()=>{
    QueueBtn.click();
});


for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
                    <div class="row">
                        <span>`+allMusic[i].name+`</span>
                        <p>`+allMusic[i].artist+`</p>
                    </div>
                    <audio id="${allMusic[i].src}" src="songs/${allMusic[i].src}"></audio>                   
                    <span class="${allMusic[i].src}">3:40</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend",liTag);
    let liAudioTag = document.getElementById(allMusic[i].src);
    let liAudioDuration = document.getElementsByClassName(allMusic[i].src)[0];

    liAudioTag.addEventListener("loadeddata",(e)=>{
        let audioDuration =  liAudioTag.duration;
        let totalMin = Math.floor(audioDuration/60);
        let totalSec = Math.floor(audioDuration%60);
        if (totalSec < 10){
            totalSec = "0"+totalSec;
        }
        liAudioDuration.innerText = totalMin  +":"+totalSec;
    })
}
