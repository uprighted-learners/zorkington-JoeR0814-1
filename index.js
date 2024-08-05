const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// this is a function that returns a promise that resolves to the user's input when the user types something in the console and presses enter key
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// an async function to start the game and prompt the user with the welcome message and the first question to start the game and then wait for the user's input
async function startGame() {
  const welcomeMessage =
    'Welcome home, you just got off the school bus and your parents are not home. From the street, you have to walk up the driveway to the garage to get in the house. Your mom left the garage unlocked for you to get in. You have to just lift the garage then get in through the basement door, use the bathroom, eat a snack, and go relax in your bedroom.';
  console.log(welcomeMessage);
  console.log(
    'When you get off the bus, you have to do what to get in the house?',
  );

  // wait for the user's input and then call the playerCommands function to handle the user's input and then wait for the user's input again and keep the game running in a loop until the game ends
  while (true) {
    let answer = await ask('>_ ');
    await playerCommands(answer.trim().toLowerCase());
  }
}

// this is the global variables for the game
let currentRoom = 'street';
// this is the player inventory array to hold the items that the player picks up in the game
let playerInventory = [];
// this is the doorLocked variable to keep track of the door status in the game, there are no doors locked in the game so the default value is false
let doorLocked = false;

// this is the roomState object that holds the rooms in the game with their description, connections, and inventory items
const rooms = {
  street: {
    description:
      'You are off the bus and on the street. You have to (walk up the driveway) to get to the house.',
    connectedRooms: ['driveway'],
    inventory: [],
  },
  driveway: {
    description:
      'You are at the top of the driveway and in front of the garage. (Lift the garage open) to get inside the garage. From there, you need to get inside the basement of the house.',
    connectedRooms: ['street', 'garage'],
    inventory: [],
  },
  garage: {
    description:
      'You are in the garage. There are two doors: one goes into the basement (open basement door), the other door goes to the backyard (open backyard door).',
    connectedRooms: ['driveway', 'basement'],
    inventory: [],
  },
  basement: {
    description:
      'You are in the basement. Walk to the hallway to get to the bathroom. There are two doors on the left: the first door is the bathroom (open bathroom door).',
    connectedRooms: ['garage', 'bathroom'],
    inventory: [],
  },
  bathroom: {
    description:
      'You are in the bathroom. On the counter are the sink, soap, and dry towel. When you are finished, use the stairs to get to the kitchen to (make a snack).',
    connectedRooms: ['basement', 'kitchen'],
    inventory: ['soap', 'water', 'towel'],
  },
  kitchen: {
    description:
      'You are in the kitchen. Make a (ham, cheese, and bread sandwich and place it on a plate) that you like and head to your bedroom to (relax).',
    connectedRooms: ['bathroom', 'bedroom'],
    inventory: ['ham', 'cheese', 'bread', 'plate'],
  },
  bedroom: {
    description:
      'You are in the bedroom. Now enjoy your snack and (relax)! Game Over!',
    connectedRooms: ['kitchen'],
  },
};

// Handle player commands based on the current room the player is in and the command the player enters in the console to interact with the game world and the items in the game world and the player inventory items and the room connections to move between rooms in the game world and the game logic to win the game and the game logic to lose the game and the game logic to end the game and the game logic to keep the game running in a loop until the game ends
async function playerCommands(command) {
  const [action, item] = command.split(' ');
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
      } else if (command === 'walk back to street') {
        moveRoom('street');
      } else {
        console.log(
          "You can't do that here. Try 'lift the garage open' to get into the garage or 'walk back to street' to go back.",
        );
      }
      break;
    case 'garage':
      if (command === 'open basement door') {
        moveRoom('basement');
      } else if (command === 'walk back to driveway') {
        moveRoom('driveway');
      } else if (command === 'open backyard door') {
        console.log("You can't go to the backyard right now.");
      } else {
        console.log(
          "You can't do that here. Try 'open basement door' to proceed or 'walk back to driveway' to go back.",
        );
      }
      break;
    case 'basement':
      if (command === 'open bathroom door') {
        moveRoom('bathroom');
      } else if (command === 'walk back to garage') {
        moveRoom('garage');
      } else {
        console.log(
          "You can't do that here. Try 'open bathroom door' to go to the bathroom or 'walk back to garage' to go back.",
        );
      }
      break;
    case 'bathroom':
      if (command === 'make a snack') {
        moveRoom('kitchen');
      } else if (command === 'walk back to basement') {
        moveRoom('basement');
      } else if (action === 'grab') {
        grabItem(item);
      } else if (action === 'drop') {
        dropItem(item);
      } else {
        console.log(
          "You can't do that here. Try 'make a snack' to go to the kitchen or 'walk back to basement' to go back.",
        );
      }
      break;
    case 'kitchen':
      if (command === 'relax') {
        moveRoom('bedroom');
      } else if (command === 'walk back to bathroom') {
        moveRoom('bathroom');
      } else if (action === 'grab') {
        grabItem(item);
      } else if (action === 'drop') {
        dropItem(item);
      } else {
        console.log(
          "You can't do that here. Try 'relax' to go to your bedroom or 'walk back to bathroom' to go back.",
        );
      }
      break;
    case 'bedroom':
      if (command === 'relax') {
        moveRoom('bedroom');
      } else if (command === 'walk back to kitchen') {
        moveRoom('kitchen');
      } else {
        console.log(
          "You can't do that here. Try 'relax' to get into the bedroom or 'walk back to kitchen' to go back.",
        );
      }
      break;
    default:
      console.log('I do not understand that command');
  }
}

// Function to grab an item from the room and add it to the player inventory and remove it from the room inventory items if the player is in the bathroom or the kitchen and the player uses the grab command to grab the item
function grabItem(item) {
  if (rooms[currentRoom].inventory.includes(item)) {
    playerInventory.push(item);
    rooms[currentRoom].inventory = rooms[currentRoom].inventory.filter(
      (i) => i !== item,
    );
    console.log(`You have taken the ${item}.`);
  } else {
    console.log(`There is no ${item} here.`);
  }
}

// Function to drop an item into the room and remove it from the player inventory and add it to the room inventory items if the player is in the bathroom or the kitchen and the player uses the drop command to drop the item in the room
function dropItem(item) {
  if (playerInventory.includes(item)) {
    rooms[currentRoom].inventory.push(item);
    playerInventory = playerInventory.filter((i) => i !== item);
    console.log(`You have dropped the ${item}.`);
  } else {
    console.log(`You don't have a ${item}.`);
  }
}

// the useItem function to use the item in the room and the game logic to use the item in the room if the player is in the bathroom or the kitchen and the player uses the use command to use the item in the room and the game logic to use the item in the room
function moveRoom(room) {
  if (!rooms[room]) {
    console.log(`The room ${room} does not exist.`);
    return;
  }
  // if the player is in the current room and the room is connected to the current room then the player can move to the room and the game logic to move the player to the room
  if (rooms[currentRoom].connectedRooms.includes(room)) {
    currentRoom = room;
    console.log(rooms[currentRoom].description);
  } else {
    console.log(`You can't move directly to the ${room} from here`);
  }
}

startGame();

