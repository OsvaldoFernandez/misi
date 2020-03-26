// PALLETE GENERATOR

const url = (color) => `${"/* @echo PALETTES_URL */"}?hex=%23${color}&sub=1`;

const parsePalettes = (data) => {
  const resp = $( '<div></div>' );
  resp.html(data);
  return resp.children('.palettes').children('.wrapper').children('.color-palette');
};

const parsePalette = (data) => {
  const palette = [];
  const colorboxes = $(data).children('.color-palette-inner').children('.color-box');
  colorboxes.each(function () {
    const colortext = $(this).find('input')[0].value;
    palette.push(colortext);
  });
  return palette;
}

const fetchPalletes = (baseColors, result, successCb, errorCb) => {
  const baseColor = baseColors.shift();
  if(baseColor) {
    $.get(url(baseColor)).then((data) => {
      const palettes = parsePalettes(data);
      palettes.each(function () {
        result.push(parsePalette(this));
      });
      fetchPalletes(baseColors, result, successCb, errorCb);
    }).catch((err) => {
      errorCb(err);
    });
  } else {
    successCb(result);
  }
}

const getPalettes = (baseColors) => {
  return new Promise((resolve, reject) => {
    fetchPalletes(baseColors, [], resolve, reject)
  });
}

const landingColors = () => $('.colorInput').toArray().map((input) => input.value);

$(() => {
  $("#addColor")[0].addEventListener("click", () => {
    $('.inputs').append('<br>');
    $('.inputs').append('<input type="text" class="colorInput"></input>');
  });
});
