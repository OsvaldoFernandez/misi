// PALLETE GENERATOR

$.get('URL').then((data) => {
  var resp = $( '<div></div>' );
  resp.html(data);

  const list = document.createElement('ul')
  const palettes = resp.children('.palettes').children('.wrapper').children('.color-palette');
  debugger;

  palettes.each(function () {


    const node = document.createElement("li");
    list.appendChild(node);
    const textnode = document.createTextNode("New pallete");
    const colorsnode = document.createElement('ul')
    node.appendChild(textnode);
    node.appendChild(colorsnode);

    const colorboxes = $(this).children('.color-palette-inner').children('.color-box');
    colorboxes.each(function () {
      const colornode = document.createElement("li");
      const colortextnode = document.createTextNode($(this).find('input')[0].value);
      colornode.appendChild(colortextnode);
      colorsnode.appendChild(colornode);
    })
  });

  document.body.appendChild(list);
}).catch((err) => {
  console.log('error');
});
