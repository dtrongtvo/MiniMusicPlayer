const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const player = $(".player");
const progress = $("#progress");

const app = {
  currenIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Childhood dreams",
      singer: "Seraphine",
      path: "./music/song1.mp3",
      image: "./img/song1.jpg",
    },
    {
      name: "MORE",
      singer: "K/DA",
      path: "./music/song2.mp3",
      image: "./img/song2.jpg",
    },
    {
      name: "K/DA POPSTAR (Cover)",
      singer: "Seraphine",
      path: "./music/song3.mp3",
      image: "./img/song3.jpg",
    },
    {
      name: "The Starry-eyed Songtress",
      singer: "Seraphine",
      path: "./music/song4.mp3",
      image: "./img/song4.jpg",
    },
    {
      name: "All the things she said",
      singer: "Seraphine",
      path: "./music/song5.mp3",
      image: "./img/song5.jpg",
    },
    {
      name: "The Baddest",
      singer: "K/DA",
      path: "./music/song6.mp3",
      image: "./img/song6.jpg",
    },
    {
      name: "Drum Go Dum",
      singer: "Kaisa",
      path: "./music/song7.mp3",
      image: "./img/song7.jpg",
    },
    {
      name: "I'll Show You",
      singer: "Ahri",
      path: "./music/song8.mp3",
      image: "./img/song8.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs
      .map((song) => {
        return `
      <div class="song">
        <div
          class="thumb"
          style="background-image: url(${song.image})"></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
      `;
      })
      .join("");
    $(".playlist").innerHTML = htmls;
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currenIndex];
      },
    });
  },

  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    const cdThumbAnimate = cdThumb.animate({
      transform: 'rotate(360deg)'
    }, {
      duration: 10000,
      iterations: Infinity
    }) 
    cdThumbAnimate.pause();
    // shrink or magnify cd thumb when scroll
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop;
      const newWidth = cdWidth - scrollTop;
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };

    // When click Play button
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
        cdThumbAnimate.pause();
      } else {
        audio.play();
        cdThumbAnimate.play();
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    // when the song is progressing
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const currentProgress = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = currentProgress;
      }
    };

    // When jump to a chosen time
    progress.onchange = function(e) {
      const seekTime = e.target.value * audio.duration / 100;
      audio.currentTime = seekTime;
    }

    // When click next button / prev button
    nextBtn.onclick = function() {
      _this.nextSong();

      cdThumbAnimate.play();
    }
    prevBtn.onclick = function() {
      _this.prevSong();

      cdThumbAnimate.play();
    }

    // When song end 
    audio.onended = function() {
      _this.nextSong()
    }
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  nextSong: function() {
    this.currenIndex++;
    if(this.currenIndex >   this.songs.length - 1) {
      this.currenIndex = 0;
    }
    this.loadCurrentSong();
    audio.play();
  },
  prevSong: function() {
    this.currenIndex--;
    if(this.currenIndex < 0) {
      this.currenIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    audio.play();
  },
  start: function () {
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};

app.start();
