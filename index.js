
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");




let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Kesariya",
        artist: "Pritam,Arjit Singh",
        image: "img/kesariya.jpg",
        path: "kesariya.mp3"
    },
    {
        name: "Dhol Baja",
        artist: "Darshan Raval",
        image: "img/dholbaja.jpg",
        path: "dholbaja.mp3"
    },
    {
        name: "Oo Antava ",
        artist: "Kanika Kapoor",
        image: "img/oo_antava.jpg",
        path: "Oo_Antava_Mawa.mp3",
    },
    {
        name: "aaj sajeya",
        artist: "Goldie sohe;",
        image: "img/aajsajeya.jpg",
        path: "aajsajeya.mp3",
    },
    {
        name: "Khamoshiyan",
        artist: "Arjit singh",
        image: "img/khamosiyan.jpg",
        path: "Khamoshiyan.mp3",
    },
    {
        name: "Ra Ra Rakkamma",
        artist: "Anup Bhandari",
        image: "img/rakkama.jpg",
        path: "Ra_Ra_Rakkamma.mp3",
    },
    {
        name: "Akh Lad Jave",
        artist: "Jubin Nautiyal",
        image: "img/akhladjave.jpg",
        path: "Akh_Lad_Jaave.mp3",
    },
    {
        name: "Care Ni Karda",
        artist: "Yo Yo Honey Singh",
        image: "img/carenikarda.jpg",
        path: "carenikarda.mp3",
    },
    {
        name: "Dance Ka Bhoot",
        artist: "pritam,Arjit singh",
        image: "img/dancekabhoot.jpg",
        path: "dance_ka_bhoot.mp3",
    },
    {
        name: "Dholida",
        artist: "Darshan raval",
        image: "img/dholida.jpg",
        path: "dholida.mp3",
    },
    {
        name: "Raataan Lambiyaan",
        artist: "Arjit singh",
        image: "img/ratalambiyan.jpg",
        path: "rata_lambiyan.mp3",
    },
];

function loadTrack(track_index) {

    clearInterval(updateTimer);
    resetValues();

    curr_track.src = "song/" + track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.getElementsByClassName('player')[0].style.background = bgColor;
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;

    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    loadTrack(track_index);
    document.querySelector('.music-list.active').classList.remove('active');
    document.getElementById(track_index).classList.add('active');
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;


    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;


        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);


        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }


        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);


function loadTrack2(id) {
    loadTrack(id);
    track_index=id;
    playTrack();
    document.querySelector('.music-list.active').classList.remove('active');
    document.getElementById(id).classList.add('active');
    var x = window.matchMedia("(max-width: 784px)");

    if(x.matches){
        closeNav();
    }
}


const ele = (data, id) => {

    return (`
    <div id="${id}" class="music-list ${id == 0 ? 'active' : ''}" onclick="loadTrack2(${id})" >
    <img src="${data.image}" alt="music">
    <div class="mdetail">
    <div class="title">${data.name}</div>
    <div class="duration">${data.artist}</div>
    </div>
    </div>
    `)
}

let list = document.getElementById('list');
let data = "<h1>Music</h1>";
for (let i = 0; i < track_list.length; i++) {
    data += ele(track_list[i], i);
}
list.innerHTML = data;


function toggleNav() {
    document.getElementById('list').style.left = '0';
    document.getElementById('closer').style.display = 'block';
    document.getElementById('adder').style.display = 'none';

}
function closeNav() {
    document.getElementById('list').style.left = '-100%';
    document.getElementById('closer').style.display = 'none';
    document.getElementById('adder').style.display = 'block';
}
