const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}

class room {
  constructor(description, items, exit) {
    (this.description = description), (this.items = items), (this.exit = exit);
  }
}

let room1 = new room({
  name: 'room1'
  description: '',
  items: '',
  exit: '',
});

let room2 = new room {
  name: 'room2'
  description: '',
  items: '',
  exit: '',
};

let room3 = new room ({
  name: 'room3',
  description: '',
  items: '',
  exit: ''
});

let room4 = new room ({
  name: 'room4',
  description: '',
  items: '',
  exit: '',
});

let room5 = new room ({
  name: 'room5',
  description: '',
  items: ''
  exit: '',
});

let room6 = new room ({
  name: 'room6',
  description: '',
  items: '',
  exit: '',
});
console.log(room);
locationLookUp = {
  room1: 'room1',
  room2: 'room2',
  room3: 'room3',
  room4: 'room4',
  room5: 'room5',
  room6: 'room6',
};

locationState = {
  room1: ['room2', 'room3'],
  room2: ['room1', 'room3'],
  room3: ['room2', 'room4'],
  room4: ['room3', 'room5'],
  room5: ['room4', 'room6'],
  room6: ['room5', 'room1'],
};

