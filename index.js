const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function start() {
  const welcomeMessage = `You just got off the bus from school, no one is home you have to get in the house by yourself
  through the garage, wash up, eat a snack and go relax in your room.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}

class room {
  constructor(description, items, exit) {
    (this.description = description),
      (this.items = items),
      (this.name = name),
      (this.exit = exit);
  }
}

let driveway = new room({
  name: 'driveway',
  description: 'it is what leads to your garage to get inside yor house',
  items: 'code, code pad, and garage',
});

let garage = new room({
  name: 'garage',
  description: 'get into the garage to go inside the basement',
  items: 'door',
});

let basement = new room({
  name: 'basement',
  description: 'the basement will lead you to the bathroom and the stairs.',
  items: 'go through the door from the garage ',
});

let bathroom = new room({
  name: 'bathroom',
  description: 'where you wash up',
  items: 'soap, washcloth, and dry towel',
});

let kitchen = new room({
  name: 'kitchen',
  description: 'where you get a snack',
  items: 'ham, cheese, and bread',
});

let bedroom = new room({
  name: 'bedroom',
  description: 'where you relax',
  items: 'gaming chair, desk, and chair',
});

let roomLocation = 'driveway';

roomLookUp = {
  driveway: 'driveway',
  garage: 'garage',
  basement: 'basement',
  bathroom: 'bathroom',
  kitchen: 'kitchen',
  bedroom: 'bedroom',
};

roomState = {
  driveway: ['garage'],
  garage: ['basement'],
  basement: ['bathroom'],
  bathroom: ['kitchen', 'bedroom'],
  kitchen: ['bathroom', 'bedroom'],
  bedroom: [],
};

function moveRoom(newRoom) {
  if (roomState[currentRoom].includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You are now in the ${currentRoom}`);
  } else {
    console.log("You can't go there from here.");
  }
}

start();

