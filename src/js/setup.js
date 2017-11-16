export default (p, params, width, height) => {
  p.createCanvas(width, height);

  p.loadImage(require('../img/ear.png'), img => {
    img.loadPixels();
    const minMax = [];

    for (let y = 0; y < img.height; y++) {
      let min, max;

      for (let x = 0; x < img.width; x++) {
        const i = 4 * (y*img.width + x);

        if (img.pixels[i+3] > 0) {
          if (!min) min = x;
          max = x;
        }

      }
      if (min && max) minMax.push([min, max]);
    }
    params.minMax = minMax;
    params.imgDim = [img.width, img.height];
    params.redraw = true;
  });
};