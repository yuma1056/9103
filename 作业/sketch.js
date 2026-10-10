let music;
let volumeSlider;

// Load music
function preload() {
  music = loadSound("assets/music.mp3");
}

// Volume slider
function setup() {

  createCanvas(1000, 700);

  volumeSlider = createSlider(0, 1, 0.5, 0.01);

  volumeSlider.position(30, 30);

  volumeSlider.style( "width", "200px");

}


function draw() {

  background(230);

  let volume =
    volumeSlider.value();

  music.setVolume(volume);

  updateGrass(volume);

  drawGrass();


  // UI
  fill(0);
  noStroke();

  textSize(16);

  text(
    "Volume: " + nf(volume, 1, 2), 30, 70
  );

  text(
    "Grass: " + grass.length, 30, 95
  );

}


function mousePressed() {

  // Start audio after user interaction
  if (!music.isPlaying()) {

    music.loop();

  }

}