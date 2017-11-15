import dat from 'dat.gui/build/dat.gui.js';

export default params => {
  const gui = new dat.GUI();

  const onChange = () => params.redraw = true;

  gui.add(params, 'Type', { 'Horizontal Lines': 0 }).onChange(onChange);
  gui.addColor(params, 'Background');
  gui.addColor(params, 'Stroke').onChange(onChange);
  gui.add(params, 'Size', 30, 600);
  gui.add(params, 'Coverage', 0, 100).onChange(onChange);
  gui.add(params, 'Download');
};