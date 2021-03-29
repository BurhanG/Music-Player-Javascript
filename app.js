const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');

const title = document.querySelector('#title');



let musicPlayer = {
    songs: ['Save Your Tears', 'rapgod', 'The Lazy Song'],
    isPlaying: false,
    songIndex: 1,
    currentSong() {
        return this.songs[this.songIndex];
    },
    loadSong() {
        song = this.currentSong();
        title.innerText = song;
        audio.src = `music/${song}.mp3`;
    },
    playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
        this.isPlaying = true;
    },
    pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')

        audio.pause();

        this.isPlaying = false;
        deleteCookie('timePlayed');
    },
    prevSong() {
        this.songIndex--;
        if (this.songIndex < 0) {
            this.songIndex = this.songs.length - 1;
        }
        this.loadSong();
        this.playSong();
    },
    nextSong() {
        this.songIndex++;
        if (this.songIndex > this.songs.length - 1) {
            this.songIndex = 0;
        }
        loadSong();
        playSong();
    }



}

//Load song details into Dom
musicPlayer.loadSong();



//update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    // console.log('duration currentTime', duration, currentTime)
    let progressPercent = (currentTime * 100) / duration;
    // console.log('progressPercent', progressPercent)
    progress.style.width = `${progressPercent}%`;
    // if (played) setCookie('timePlayed', currentTime);
}

// set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//set cookie for audio time
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

//get cookie for audio time
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
function deleteCookie(c_name) {
    console.log(delete worked);
    document.cookie = c_name + '=; Max-Age=-99999999;';
}



//Event Lsitener
playBtn.addEventListener('click', () => {
    musicPlayer.isPlaying ? musicPlayer.pauseSong() : musicPlayer.playSong();
});

// change song
prevBtn.addEventListener('click', musicPlayer.prevSong);
nextBtn.addEventListener('click', musicPlayer.nextSong);

// Time and song Update
audio.addEventListener('timeupdate', updateProgress);


//click on progressbar
progressContainer.addEventListener('click', setProgress);

//song ends 
audio.addEventListener('ended', musicPlayer.nextSong)

checkPlayedBefore = () => {
    localStorage.openpages = Date.now();


    console.log('checkPlayedBefore worked');
    console.log('windowUpdated', windowUpdated());
    let currentTime = getCookie('timePlayed');
    let duration = getCookie('duration');

    console.log('current time', currentTime);
    console.log('duration', duration);
    if (currentTime) {

        audio.currentTime = currentTime;
        playSong();

        let progressPercent = (currentTime * 100) / duration;
        progress.style.width = `${progressPercent}%`;
    }
}
checkPlayedBefore();


var onLocalStorageEvent = function (e) {
    console.log('e', e);
    if (e.key == "openpages") {
        // Listen if anybody else is opening the same page!
        localStorage.page_available = Date.now();
    }
    if (e.key == "page_available") {
        alert("One more page already open");
    }
};
window.addEventListener('storage', onLocalStorageEvent, false);