function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {h,s,l};
}

function distanceHSL(color1, color2) {
  const hsl1 = hexToHSL(color1);
  const hsl2 = hexToHSL(color2);

  const h = (Math.abs(Math.abs((hsl1.h - hsl2.h + 180) % 360) - 180)) * 100 / 180;
  const s = Math.abs(hsl1.s - hsl2.s);
  const lumDist = Math.abs(hsl1.l - hsl2.l);
  const l = lumDist > 25 ? 1000 : lumDist;

  return {h,s,l};
}

function distance(color1, color2) {
  const hsl = distanceHSL(color1, color2);
  return (hsl.h + hsl.s + hsl.l);
};

const color1 = '#00254C';
const color2 = '#98CF04';

const landingColors = [color1, color2];
const unsignedLandingColors = landingColors.map((color) => color.substring(1));

const getNearestInPalette = (palette) => {
  const paletteColors = {
    colors: [],
    totalDistance: 0
  };

  landingColors.forEach((lColor) => {
    const distancedColors = palette.map((pColor) => {
      return {pColor, distance: distance(pColor, lColor)}
    });

    const nearest = _.minBy(distancedColors, 'distance');
    paletteColors.totalDistance += nearest.distance;
    paletteColors.colors.push(nearest.pColor);
  });

  return paletteColors;
}


getPalettes(unsignedLandingColors).then((palettes) => {
  const palettesColors = [];

  palettes.forEach((palette) => {
    palettesColors.push(getNearestInPalette(palette))
  });

  const orderedPalettesColors = _.sortBy(palettesColors, ['totalDistance']);
  console.log(JSON.stringify(orderedPalettesColors));
});
