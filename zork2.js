const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// an async function to start the game
async function startGame() {
  const welcomeMessage =
    'Welcome home, you just got off the school bus and your parents are not home. You have to get in the house by yourself through the garage, you mom left the garage unlocked for you to get in, all you have to do is wash up, eat a snack and go relax in your room.';
  console.log(welcomeMessage);
  // let answer = await ask('>_');
  // playerCommands(answer);
  while (true) {
    let answer = await ask('>_ ');
    await playerCommands(answer.trim().toLowerCase());
  }
}

let currentRoom = 'driveway';
let playerInventory = [];
let doorLocked = false;

// this is the room class
class Room {
  constructor(description, connection, inventory) {
    (this.description = description),
      (this.connection = connection),
      (this.inventory = inventory);
  }
}

console.log(Room);

// this is the roomState object
const rooms = {
  driveway: {
    description:
      'You are standing in a driveway the street is south the garage is north. ',
    connection: ['garage', 'street'],
    inventory: [],
  },
  garage: {
    description: 'You have to {open} garage to get to the basement.',
    connection: ['driveway', 'basement'],
    inventory: [],
  },
  basement: {
    description: 'You are in the basement. There is a door to the north.',
    connection: ['garage', 'bathroom'],
    inventory: [],
  },
  bathroom: {
    description:
      'You are in the bathroom. There is a door to the north and south.',
    connection: ['basement', 'kitchen', 'bedroom'],
    inventory: ['soap', 'water', 'towel'],
  },
  kitchen: {
    description:
      'You are in the kitchen. There is a door to the north and south.',
    connection: ['bathroom', 'kitchen', 'bedroom'],
    inventory: ['ham', 'cheese', 'bread', 'plate'],
  },
  bedroom: {
    description: 'You are in the bedroom. There is a door to the south.',
    connection: ['bathroom'],
    inventory: ['chair', 'bed', 'desk', 'lamp'],
  },
};

console.log(rooms);

// this is the rooms state object
roomState = {
  driveway: ['garage'],
  garage: ['basement'],
  basement: ['bathroom'],
  bathroom: ['kitchen', 'bedroom'],
  kitchen: ['bathroom', 'bedroom'],
  bedroom: [],
};
console.log(roomState);

// rooms machines of the game room state
function moveRoom(direction) {
  if (rooms[currentRoom].connection.includes(direction)) {
    currentRoom = direction;
    console.log(rooms[currentRoom].description);
  } else {
    console.log("You can't go that way");
  }
}

startGame();

