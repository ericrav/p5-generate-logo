export const LINES = 'A';
export const STEPS = 'B';
export const DOTS = 'C';
export const ANGLES = 'D';

const curvePoints = [
  [5.13411274,95.2408377, 5.13411274,95.2408377, 22.9351599,1, 127.856626,1],
  [127.856626,1, 234.453484,1, 251.416835,116.602094, 250.369715,166.445026],
  [250.369715,166.445026, 247.856626,290.842932, 146.076521,401, 88.9037462,401],
  [88.9037462,401, 50.1602907,401, 40.5267829,362.04712, 35.919453,348.015707],
  [35.919453,348.015707, 31.5215473,334.82199, -15.3894475,309.900524, 22.3068876,251.471204],
  [22.3068876,251.471204, 36.7571494,227.17801, 28.7990342,216.706806, 10.788563,176.078534],
  [10.788563,176.078534, -7.22190821,135.450262, 5.13411274,95.2408377, 5.13411274,95.2408377]
];

export default (params) => {
  const pg = params.pg;
  pg.clear();

  const xOffset = (pg.width - 131*4) / 4;

  if (params.Type === LINES) {
    pg.noFill();
    pg.stroke(params.Stroke);
    for (let y = 0; y < params.minMax.length; y++) {
      let x1 = params.minMax[y][0];
      x1 += Math.pow(Math.random(), 10) * 30 * Math.pow(-1, Math.floor(Math.random()*2 + 1));
      let x2 = params.minMax[y][1];
      x2 += Math.pow(Math.random(), 10) * 40 * Math.pow(-1, Math.floor(Math.random()*2 + 1));
      if (Math.random()*100 <= params.Coverage) pg.line(x1*2 + xOffset, y*2, x2*2 + xOffset, y*2);
    }
  } else if (params.Type === STEPS) {
    pg.noFill();
    pg.stroke(params.Stroke);

    const mapPoint = (x1, y1, x2, y2, x3, y3, x4, y4, size=1) => {
      const xOff = (251 - 251*size)/2 + xOffset;
      const yOff = (402 - 402*size)/2;

      return [
        x1*size + xOff, y1*size + yOff,
        x2*size + xOff, y2*size + yOff,
        x3*size + xOff, y3*size + yOff,
        x4*size + xOff, y4*size + yOff
      ];
    };

    const draw = size => {
      for (let point of curvePoints) {
        pg.bezier(...mapPoint(...point, size));
      }
    };

    draw(1);
    const steps = Math.round(params.Coverage);
    for (let i = 1; i < steps; i++) {
      draw(i/steps);
    }
  } else if (params.Type === DOTS) {
    pg.noStroke();
    pg.fill(params.Stroke);
    const max = (params.Coverage/100) * 131 * 206 / 4;
    for (let i = 0; i < max; i++) {
      const y = Math.random() * params.minMax.length;
      const minMax = params.minMax[Math.floor(y)];
      const x = minMax[0] + Math.random()*(minMax[1] - minMax[0]);
      pg.ellipse(x*2 + xOffset, y*2, 2, 2);
    }
  } else if (params.Type === ANGLES) {
    pg.noFill();
    pg.stroke(params.Stroke);
    pg.beginShape();

    const randomVertex = (x, y, times=1) => {
      if (times < 1) return;
      const ry = Math.random() * params.minMax.length;
      const minMax = params.minMax[Math.floor(ry)];
      const rx = minMax[0] + Math.random()*(minMax[1] - minMax[0]);
      const dx = x + (rx - x) * (Math.pow(Math.random(), 3)*0.65 + 0.1);
      const dy = y + (ry - y) * (Math.pow(Math.random(), 3)*0.65 + 0.1);
      pg.vertex(dx*2 + xOffset, dy*2);
      randomVertex(dx, dy, times-1);
    };

    for (let y = 0; y < params.minMax.length; y+=3) {
      const x = params.minMax[y][1];
      if (Math.random()*100 <= params.Coverage) {
        randomVertex(x, y, Math.random()*5 + 1);
      } else {
        pg.vertex(x*2 + xOffset, y*2);
      }
    }

    for (let y = params.minMax.length - 1; y >= 0; y-=3) {
      const x = params.minMax[y][0];
      if (Math.random()*100 <= params.Coverage) {
        randomVertex(x, y, Math.random()*5 + 1);
      } else {
        pg.vertex(x*2 + xOffset, y*2);
      }
    }

    pg.vertex(params.minMax[0][1]*2 + xOffset, 0);
    // const max = (params.Coverage/100) * 400;
    // for (let i = 0; i < max; i++) {
    //   let y = Math.random() * params.minMax.length;
    //   let x = params.minMax[Math.floor(y)][Math.floor(Math.random()*2)];
    //   x += Math.pow(Math.random(), 10) * 10 * Math.pow(-1, Math.floor(Math.random()*2 + 1));
    //   y += Math.pow(Math.random(), 10) * 10 * Math.pow(-1, Math.floor(Math.random()*2 + 1));
    // }
    pg.endShape();
  }

  params.redraw = false;
};