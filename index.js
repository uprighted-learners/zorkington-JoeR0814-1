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
    'Welcome home, you just got off the school bus and your parents are not home. From the street, you have to walk up the driveway to the garage to get in the house. Your mom left the garage unlocked for you to get in. You have to just lift the garage then get in through the basement door, use the bathroom, eat a snack, and go relax in your bedroom.';
  console.log(welcomeMessage);
  console.log(
    'when you get off the bus what do you have to do to get from the bus stop to the house?',
  );
  while (true) {
    let answer = await ask('>_ ');
    await playerCommands(answer.trim().toLowerCase());
  }
}

let currentRoom = 'street';
let playerInventory = [];
let doorLocked = false;

// this is the roomState object
const rooms = {
  street: {
    description:
      'You are off the bus and on the street. You have to (walk to the driveway) to get to the house.',
    connection: ['driveway'],
    inventory: [],
  },
  driveway: {
    description:
      'your at the top of the driveway and in front of the garage, (lift the garage open) to get inside of the garage from there you need to get inside the basement of the house.',
    connection: ['garage'],
    inventory: [],
  },
  garage: {
    description:
      'You are in the garage. There are two doors: one goes into the basement (open basement door), the other door goes to the backyard (open backyard door).',
    connection: ['driveway', 'basement'],
    inventory: [],
  },
  basement: {
    description:
      'You are in the basement. Walk to the hallway to get to the bathroom. There are two doors on the left: the first door is the bathroom (open bathroom door).',
    connection: ['garage', 'bathroom'],
    inventory: [],
  },
  bathroom: {
    description:
      'You are in the bathroom. On the counter is the sink, soap, and dry towel. When you are finished, use the stairs to get to the kitchen to (make a snack).',
    connection: ['basement', 'kitchen', 'bedroom'],
    inventory: ['soap', 'water', 'towel'],
  },
  kitchen: {
    description:
      'You are in the kitchen. Make a sandwich that you like and head to your bedroom to (relax).',
    connection: ['bathroom', 'bedroom'],
    inventory: ['ham', 'cheese', 'bread', 'plate'],
  },
  bedroom: {
    description:
      'You are in the bedroom. Now enjoy your snack and (relax)! Game Over!',
    connection: ['kitchen'],
  },
};

// Handle player commands based on the current room
async function playerCommands(command) {
  switch (currentRoom) {
    case 'street':
      if (command === 'walk up the driveway') {
        moveRoom('driveway');
      } else {
        console.log(
          "You can't do that here. Try 'walk up the driveway' to get to the driveway.",
        );
      }
      break;
    case 'driveway':
      if (command === 'lift the garage open') {
        moveRoom('garage');
      } else {
        console.log(
          "You can't do that here. Try 'lift the garage open' to get into the garage.",
        );
      }
      break;
    case 'garage':
      if (command === 'open basement door') {
        moveRoom('basement');
      } else if (command === 'open door to the backyard') {
        console.log("You can't go to the backyard right now.");
      } else {
        console.log(
          "You can't do that here. Try 'open basement door' to proceed.",
        );
      }
      break;
    case 'basement':
      if (command === 'open bathroom door') {
        moveRoom('bathroom');
      } else {
        console.log(
          "You can't do that here. Try 'open bathroom door' to go to the bathroom.",
        );
      }
      break;
    case 'bathroom':
      if (command === 'make a snack') {
        moveRoom('kitchen');
      } else {
        console.log(
          "You can't do that here. Try 'make a snack' to go to the kitchen.",
        );
      }
      break;
    case 'kitchen':
      if (command === 'relax') {
        moveRoom('bedroom');
      } else {
        console.log(
          "You can't do that here. Try 'relax' to go to your bedroom.",
        );
      }
      break;
    case 'bedroom':
      console.log(
        "You're already in your bedroom. You can relax here. Game over!",
      );
      break;
    default:
      console.log('I do not understand that command');
  }
}

function moveRoom(direction) {
  if (rooms[currentRoom].connection.includes(direction)) {
    currentRoom = direction;
    console.log(rooms[currentRoom].description);
  } else {
    console.log("You can't go that way");
  }
}

startGame();

