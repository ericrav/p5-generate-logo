const LINES = 0;

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
  }

  params.redraw = false;
};