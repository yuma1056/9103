
let grass = [];
const MAX_GRASS = 100;

//the volume decided which grass continues to grow and 
// which grass begins to shrink back.
function updateGrass(volume) {

  //According to the current volume, how many grasses should there be.
  let targetAmount = floor(
    map(volume, 0, 1, 0, MAX_GRASS)
  );

  while (grass.length < targetAmount) {

    grass.push(createGrass());

  }

  //let grass grow or disappear
  for (let i = 0; i < grass.length; i++) {

    let g = grass[i];


    if (i < targetAmount) {
      if (g.growth < 1) {
        g.growth += 0.01;
      }
    } 

    else {
      // Extra grass
      if (g.growth > 0) {
        g.growth -= 0.02;
      }
    }
  }



  for (let i = grass.length - 1; i >= 0; i--) {

    if (grass[i].growth <= 0) {

      grass.splice(i, 1);

    }

  }
}

// Create one vine
function createGrass() {

  return {
    x: random(width),
    y: random(height * 0.65, height),
    height: random(50, 180),

    curl: random(0.2, 0.35),
    phase: random(TWO_PI),

    growth: 0
  };
}


// Draw more vines
function drawGrass() {

  for (let g of grass) {

    // Gradually grow the vine
    if (g.growth < 2) {
      g.growth += 0.01;
    }

    push();

    translate(g.x, g.y);

    stroke(40, 120, 50);
    strokeWeight(3);
    noFill();

    beginShape();

    // Only draw the currently grown part
    let currentHeight = g.height * g.growth;

    for (let i = 0; i <= currentHeight; i += 2) {

      let progress = i / g.height;

      let angle =
        g.phase +
        progress * progress *
        g.curl * TWO_PI;

      let radius = 5 + progress * 25;

      let xOffset =
        cos(angle) * radius;

      let yOffset =
        -i + sin(angle) * radius;

      curveVertex(
        xOffset,
        yOffset
      );
    }

    endShape();

    pop();
  }
}