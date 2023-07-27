class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }
  getName() {
    return this.title + "-" + this.singer;
  }
}

const musicList=[
new Music("Zalim","Sezen Aksu", "zalim.jpg","Zalim.mp3" ),
new Music("Haydi Gel Benimle Ol","Sezen Aksu", "haydiGel.jpg","haydiGelBenimleOl.mp3" ),
new Music("Firuze","Sezen Aksu", "firuze.jpg","Firuze.mp3" )
];