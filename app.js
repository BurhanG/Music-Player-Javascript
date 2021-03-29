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
    currentTime: null,
    currentSong() {
        return this.songs[this.songIndex];
    },
    loadSong() {
        song = this.currentSong();
        title.innerText = song;
        audio.src = `music/${song}.mp3`;
    },
    playSong() {
        this.loadSong();
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        if (this.currentTime) audio.currentTime = this.currentTime;
        audio.play();
        this.isPlaying = true;
    },
    pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')

        audio.pause();

        this.isPlaying = false;

    },
    prevSong() {
        console.log('aaa', this);
        this.songIndex--;
        this.currentTime = null;

        if (this.songIndex < 0) {
            this.songIndex = this.songs.length - 1;
        }
        this.loadSong();
        this.playSong();
    },
    nextSong() {
        this.songIndex++;
        this.currentTime = null;

        if (this.songIndex > this.songs.length - 1) {
            this.songIndex = 0;
        }
        this.loadSong();
        this.playSong();
    },
    setStorageMusicInfo() {
        playedSong = {
            songs: this.songs,
            isPlaying: this.isPlaying,
            songIndex: this.songIndex,
            currentTime: this.currentTime
        }
        setStorage('playedSong', playedSong);
        // console.log(getStorage('playedSong')[0]);
    }



}



//update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    musicPlayer.currentTime = currentTime;

    let progressPercent = (currentTime * 100) / duration;
    progress.style.width = `${progressPercent}%`;

    musicPlayer.setStorageMusicInfo()
}

// set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function onLocalStorageEvent(e) {
    if (e.key == "openpages") {
        // Listen if anybody else is opening the same page!
        localStorage.page_available = Date.now();
        musicPlayer.pauseSong();
        console.log('1.sayfa');
    }
    if (e.key == "page_available") {
        console.log('2.sayfa');
    }
};


/*---- Event Listeners ----*/
playBtn.addEventListener('click', () => {
    musicPlayer.isPlaying ? musicPlayer.pauseSong() : musicPlayer.playSong();
});

// change song
prevBtn.addEventListener('click', () => {
    musicPlayer.prevSong();
});
nextBtn.addEventListener('click', () => {
    musicPlayer.nextSong();
});

// Time and song Update
audio.addEventListener('timeupdate', updateProgress);

//click on progressbar
progressContainer.addEventListener('click', setProgress);

//song ends 
audio.addEventListener('ended', musicPlayer.nextSong)

//when page opened
window.addEventListener('storage', onLocalStorageEvent, false);



checkPlayedBefore = () => {
    setStorage('openpages', Date.now());

    //Load song details into Dom
    musicPlayer.loadSong();

    storedSong = getStorage('playedSong')[0];
    console.log(storedSong);
    musicPlayer.songIndex = storedSong.songIndex;
    musicPlayer.currentTime = storedSong.currentTime;

    if (storedSong && storedSong.isPlaying) {
        console.log('evvet');
        musicPlayer.playSong();
    }

    console.log('checkPlayedBefore worked');

}
checkPlayedBefore();


