const play = document.querySelector("#play");
const audio = document.querySelector("audio");
const img = document.querySelector("img");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const music_list = document.querySelectorAll(".music_list");
let progress = document.querySelector("#progress");
let progress_div = document.querySelector(".progress_div");
let duration_time = document.querySelector("#duration");
let current_time = document.querySelector("#current_time");

let isPlay = true;
const songs = [
    {
        id : 0,
        name : 1,
        title: "CHALE AANA",
        artist: "Armaan M, Amaal M,Kunaal V"
    },
    {
        id : 1,
        name : "2",
        title: "Believer",
        artist: "Imagine Dragons"
    },
    {
        id : 2,
        name : "3",
        title: "Dil Mein Ho Tum",
        artist: "Rochak K, Armaan M, Bappi L, Manoj M"
    },
    {
        id : 3,
        name : "4",
        title: "Photo",
        artist: "Karan S |Goldboy |TanishkB | Nirmaan"
    },
];
let nextSongByclick = (v) => {
    songsIndex = v;
    loadSong(songs[songsIndex]);
    playMusic();
}
for (const music_lists of music_list) {
    music_lists.addEventListener("click",(e)=>{
        let value = e.target.dataset.num;
        nextSongByclick(value);
    });
}

const playMusic = () =>{
    isPlay = false;
    audio.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
}
const pauseMusic = () => {
    isPlay = true;
    audio.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
    
}

play.addEventListener("click",()=>{
    if(isPlay === true){
        playMusic();
    }else{
        pauseMusic();
    }
});

const loadSong = (songs) => {
    document.querySelector("#artist").innerHTML = songs.artist;
    document.querySelector("#title").innerHTML = songs.title;
    audio.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
}
let songsIndex = 0;
let v = -1
function nextSong (){
    
    songsIndex = (songsIndex + 1) % songs.length;
    loadSong(songs[songsIndex]);
    playMusic();

}

const prevSong = () => {
    songsIndex = (songsIndex - 1 +  songs.length) % songs.length;
    // songsIndex = 0;
    loadSong(songs[songsIndex]);
    playMusic();

}
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);

audio.addEventListener('timeupdate',(e)=>{
    // console.log(e);
    let { currentTime , duration } = e.srcElement;
    let move_progress = (currentTime / duration ) * 100;
    progress.style.width = move_progress + '%';
    // console.log(duration);
    min_duration = Math.floor(duration / 60);
    sec_duration = Math.floor(duration % 60);
    if(move_progress){
        duration_time.textContent = `${min_duration}:${sec_duration}`;
    }
    min_current_time = Math.floor(currentTime / 60);
    sec_current_time = Math.floor(currentTime % 60);
    sec_current_time < 10 ? current_time.textContent = `${min_current_time}:0${sec_current_time}` : current_time.textContent = `${min_current_time}:${sec_current_time}`

    if(currentTime === duration){
        nextSong();
    }
});

progress_div.addEventListener('click',(e)=>{
    let {duration} = audio;
    let movie_progress  = (e.offsetX / e.srcElement.clientWidth) * duration;
    console.log(movie_progress);
    console.log(e.offsetX);
    // console.log(duration);
    audio.currentTime = movie_progress;
})
// console.log(progress_div);