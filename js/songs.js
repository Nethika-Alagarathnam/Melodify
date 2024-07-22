class Song {
  constructor(name, artist, img, audio) {
    this.name = name;
    this.artist = artist;
    this.img = img;
    this.audio = audio;
  }
}

const songs = [
  new Song("Chammak Challo", "Vishal-Shekhar", "i1", "Chammak"),
  new Song("Illuminati", "Sushin Shyam, Dabzee", "i2", "Illuminati"),
  new Song("Calm Down", "Rema", "i3", "calmdown"),
  new Song("Gasolina", "Daddy Yankee", "i4", "Gasolina"),
  new Song("Shape-Of-You", "Ed Sheeran", "i5", "Shapeofyou")
];
