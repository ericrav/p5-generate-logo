import p5 from 'p5';
import setup from './setup';
import draw from './draw';
import setupGUI from './gui';


const Params = function() {
  this.Type = 'A';
  this.Background = [255, 255, 255];
  this.Stroke = [0, 0, 0];
  this.Coverage = 50;
  this.minMax = [];
  this.redraw = false;
  this.Size = 300;
  this.Download = (function() {
    const p = new p5();
    const padding = 1.6;
    const download = p.createGraphics(this.Size*padding, this.Size*padding);
    download.image(this.pg, this.Size*(padding - 1)/2, this.Size*(padding - 1)/2, this.Size, this.Size, 0, 0, this.pg.width, this.pg.height);

    // img.resize(0, this.Size);
    p.saveCanvas(download, 'belljar', 'png');
  }).bind(this);
};


(() => {

  // set sketch values
  const width = window.innerWidth;
  const height = window.innerHeight;

  // create dat GUI for setting parameters
  const params = new Params();
  setupGUI(params);

  // sketch setup and draw functions
  const sketch = p => {
    p.setup = () => {
      setup(p, params, width, height);
      params.pg = p.createGraphics(824, 824);
    };

    p.draw = () => {
      p.background(p.color(params.Background));
      if (params.redraw) draw(params);
      p.image(params.pg, (width - params.Size) / 2, (height - params.Size) / 2, params.Size, params.Size, 0, 0, params.pg.width, params.pg.height);
    };
  };

  // add p5 sketch to DOM
  new p5(sketch);
})();