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
    'Welcome home, you just got off the school bus and your parents are not home. from the street You have to head north into the drive and walk to the garage, to get in the house. Your mom left the garage unlocked for you to get in, you have to just lift the garage, get in through the basemen, wash up in the bathroom, eat a snack and go relax in your room.';
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

// this is the roomState object
const rooms = {
  driveway: {
    description:
      'Your standing in the street head {north} into the drive to get in the garage ',
    connection: ['garage', 'street'],
    inventory: [],
  },
  garage: {
    description: 'You have to {lift} the garage to get to the basement.',
    connection: ['driveway', 'basement'],
    inventory: [],
  },
  basement: {
    description:
      'You are in the garage, you have to {open} the door to get into the basemen.',
    connection: ['garage', 'bathroom'],
    inventory: [],
  },
  bathroom: {
    description:
      'You are in the basement, There is a door to get into the bathroom to wash up, the sink is there for water, soap and the towel is there for you ot {wash up}.',
    connection: ['basement', 'kitchen', 'bedroom'],
    inventory: ['soap', 'water', 'towel'],
  },
  kitchen: {
    description:
      'after the bathroom, head into the kitchen to make yourself a {snack}.',
    connection: ['bathroom', 'bedroom'],
    inventory: ['ham', 'cheese', 'bread', 'plate'],
  },
  bedroom: {
    description:
      'when you are done in the kitchen, head to your bedroom to now enjoy your snack and {relax} .',
    connection: ['kitchen', 'bathroom'],
    inventory: ['chair', 'bed', 'desk', 'lamp'],
  },
};

// this is the playerCommands function
async function playerCommands(commands) {
  switch (commands) {
    case 'north':
      console.log('head north to the garage');
    case 'lift':
      console.log(
        'You have to lift the garage for it to open to get int the basement',
      );
      break;
    case 'open':
      console.log(
        'open the basement door it is unlocked and head to the bathroom',
      );
      break;
    case 'wash up':
      console.log(
        'go to the bathroom to wash up, and go to the kitchen to make a snack.',
      );
      break;
    case 'snack':
      console.log('make a sandwich in the kitchen then head to you bedroom.');
      break;
    case 'relax':
      console.log('go to the bedroom to relax');
      break;
    default:
      console.log('I do not understand that command');
  }
}

// this is the rooms state object
roomState = {
  driveway: ['garage'],
  garage: ['basement'],
  basement: ['bathroom'],
  bathroom: ['kitchen', 'bedroom'],
  kitchen: ['bathroom', 'bedroom'],
  bedroom: [],
};

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

