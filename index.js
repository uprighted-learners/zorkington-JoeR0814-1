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
    'when you get off the bus what do you have to do to get from the bus stop to the house?',
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
      'You are in the kitchen. Make a (ham, cheese, on bread, sandwich and place it on a plate) that you like and head to your bedroom to (relax).',
    connection: ['bathroom', 'bedroom'],
    inventory: ['ham', 'cheese', 'bread', 'plate'],
  },
  bedroom: {
    description:
      'You are in the bedroom. Now enjoy your snack and (relax)! Game Over!',
    connection: ['kitchen'],
  },
};

// Handle player commands based on the current room the player is in and the command the player enters in the console to interact with the game world and the items in the game world and the player inventory items and the room connections to move between rooms  in the game world and the game logic to win the game and the game logic to lose the game and the game logic to end the game and the game logic to keep the game running in a loop until the game ends
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
      } else {
        console.log(
          "You can't do that here. Try 'lift the garage open' to get into the garage.",
        );
      }
      break;
    case 'garage':
      if (command === 'open basement door') {
        moveRoom('basement');
      } else if (command === 'open backyard door') {
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
      // if the player uses the soap in the bathroom
      if (command === 'make a snack') {
        moveRoom('kitchen');
        // these are the commands to use to grab the bathroom items
      } else if (action === 'grab') {
        grabItem(item);
        // these are the commands to use to drop the bathroom items
      } else if (action === 'drop') {
        dropItem(item);
        // these are the commands to use to use the bathroom items
      } else {
        console.log(
          "You can't do that here. Try 'make a snack' to go to the kitchen.",
        );
      }
      break;
    case 'kitchen':
      // if the player uses the ham, cheese, and bread to make a sandwich in the kitchen and then goes to the bedroom to relax
      if (command === 'relax') {
        moveRoom('bedroom');
        // these are the commands to use to grab the kitchen items
      } else if (action === 'grab') {
        grabItem(item);
        // these are the commands to use to drop the kitchen items
      } else if (action === 'drop') {
        dropItem(item);
        // these are the commands to use to make a sandwich in the kitchen
      } else {
        console.log(
          "You can't do that here. Try 'relax' to go to your bedroom.",
        );
      }
      break;
    // if the player is in the bedroom and types relax the game ends
    case 'bedroom':
      console.log(
        "You're already in your bedroom. You can relax here. Game over!",
      );
      // end the game
      break;
    default:
      console.log('I do not understand that command');
      rl.close();
  }
}

// Function to grab an item from the room and add it to the player inventory and remove it from the room inventory items
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

// Function to drop an item into the room and remove it from the player inventory and add it to the room inventory items
function dropItem(item) {
  if (playerInventory.includes(item)) {
    rooms[currentRoom].inventory.push(item);
    playerInventory = playerInventory.filter((i) => i !== item);
    console.log(`You have dropped the ${item}.`);
  } else {
    console.log(`You don't have a ${item}.`);
  }
}

// the useItem function to use the item in the room and the game logic to use the item in the room
function useItem(item) {
  // if the player has the item in the player inventory and the player is in the bathroom and the item is soap then the player uses the soap to wash their hands
  if (playerInventory.includes(item)) {
    if (currentRoom === 'bathroom' && item === 'soap') {
      console.log('You use the soap to wash your hands.');
      playerInventory = playerInventory.filter((i) => i !== item);
      rooms[currentRoom].inventory.push(item);
      // these go to the kitchen to make a snack
    } else if (currentRoom === 'kitchen' && item === 'ham') {
      console.log('You use the ham to make a sandwich.');
      playerInventory = playerInventory.filter((i) => i !== item);
      rooms[currentRoom].inventory.push(item);
    } else {
      console.log(`You can't use the ${item} here.`);
    }
  } else {
    console.log(`You don't have a ${item}.`);
  }
}

// Function to move between rooms in the game world based on the room connections in the game
function moveRoom(direction) {
  if (rooms[currentRoom].connection.includes(direction)) {
    currentRoom = direction;
    console.log(rooms[currentRoom].description);
  } else {
    console.log("You can't go that way");
  }
}

startGame();

