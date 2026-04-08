// ----- VARIABLES -----
let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');
audio.preload = "auto"; // preload audio for smoother playback

let currentSong = 0; // 0-based index
let playMusic = Array.from(document.getElementsByClassName('playMusic'));
let allMusic = Array.from(document.getElementsByClassName('music-card'));

let shuffleBtn = document.getElementById('shuffle');
let repeatBtn = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnShuffle = false;
let songOnRepeat = false;

// ----- SONG DATA -----
let songs = [
    { songName: 'Song 1', songDes: 'This is the description for song 1', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Song 2', songDes: 'This is the description for song 2', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Song 3', songDes: 'This is the description for song 3', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Song 4', songDes: 'This is the description for song 4', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Song 5', songDes: 'This is the description for song 5', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Song 6', songDes: 'This is the description for song 6', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Song 7', songDes: 'This is the description for song 7', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Song 8', songDes: 'This is the description for song 8', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Song 9', songDes: 'This is the description for song 9', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Song 10', songDes: 'This is the description for song 10', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Song 11', songDes: 'This is the description for song 11', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Song 12', songDes: 'This is the description for song 12', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Song 13', songDes: 'This is the description for song 13', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Song 14', songDes: 'This is the description for song 14', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Song 15', songDes: 'This is the description for song 15', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Song 16', songDes: 'This is the description for song 16', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Song 17', songDes: 'This is the description for song 17', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Song 18', songDes: 'This is the description for song 18', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3' }
];

let order = [...songs]; // current order of songs (for shuffle)

// ----- INITIALIZE MUSIC CARDS -----
allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

// ----- FUNCTIONS -----
function makeAllPlay() {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

function updateNowBar() {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong].songDes;
}

function shuffleSongs(original) {
    let shuffled = [...original];
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function playNextSong() {
    if (!songOnRepeat) currentSong = (currentSong + 1) % order.length;
    audio.src = order[currentSong].songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    makeAllPlay();
    updateNowBar();
}

function playPrevSong() {
    currentSong = (currentSong - 1 + order.length) % order.length;
    audio.src = order[currentSong].songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    makeAllPlay();
    updateNowBar();
}

// ----- EVENT LISTENERS -----
play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime === 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progressBar.value}%, #333 ${progressBar.value}%)`;
});

// Play song from card
playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        currentSong = parseInt(e.target.id) - 1; // 0-based index
        audio.src = order[currentSong].songPath;
        audio.currentTime = 0;
        audio.play();

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        updateNowBar();
    });
});

// Shuffle button
shuffleBtn.addEventListener('click', () => {
    if (!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffleBtn.classList.add('active');
        repeatBtn.classList.remove('active');
        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffleBtn.classList.remove('active');
        order = songs;
    }
});

// Repeat button
repeatBtn.addEventListener('click', () => {
    if (!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeatBtn.classList.add('active');
        shuffleBtn.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeatBtn.classList.remove('active');
    }
});

// Forward & Backward buttons
document.getElementById('forward').addEventListener('click', playNextSong);
document.getElementById('backward').addEventListener('click', playPrevSong);

// Auto next song when ended
audio.addEventListener('ended', playNextSong);

// ----- INITIAL NOW BAR -----
updateNowBar();