// TODO: Get eq prob shuffle.
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// My reference chromosome (initial)
// TODO: Get this from previous generation
const elements = [
  [
    'preheader',
    'navbar'
  ], [
    'logo',
    'title',
    'social'
  ], [
    'option2',
    'option3',
    'option4',
    'option5'
  ], [
    'section1',
    'section2',
    'section3',
    'section4',
    'section5'
  ]
];


const randomize = () => {
  const newElements = [...elements].map((candidates) => [...candidates]);
  return newElements.map((candidates) => shuffle(candidates));
}

// Getting new chrosomose
// TODO: This one should not be totally random. Just minor mutation.
const shouldBes = randomize();

const swapDivs = (selector1, selector2, index, j) => {
  // Swapping divs
  div1 = $(`.${selector1}`);
  div2 = $(`.${selector2}`);
  const preDiv1 = div1.prev();
  const preDiv2 = div2.prev();
  preDiv1.after(div2);
  preDiv2.after(div1);

  // Swapping reference chromosome to obtain indexes
  let tmp = elements[index][j];
  elements[index][j] = elements[index][j + 1];
  elements[index][j + 1] = tmp;
}

let bubbleSort = (candidates, index) => {
  const len = candidates.length;
  for (let i = 0; i < len -1; i++) {
    for (let j = 0; j < len -1 -i; j++) {
      if (isGreater(candidates[j], candidates[j + 1], index)) {
        swapDivs(candidates[j], candidates[j + 1], index, j)
      }
    }
  }
};

const isGreater = (selector1, selector2, index) => {
  const cands = shouldBes[index];
  const index1 = cands.findIndex((elem) => elem == selector1);
  const index2 = cands.findIndex((elem) => elem == selector2);
  return index1 > index2;
};

const swap = () => {
  elements.forEach((candidates, index) => {
    bubbleSort(candidates, index);
  });
}

swap();

// TODO: When swapping first div it sticks focus to that one, even if there is other on above.
const focus = () => {
  $(window).scrollTop(0);
};

setTimeout(focus, 10);
