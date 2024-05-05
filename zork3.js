const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// an async function to start the game
async function start() {
  const welcomeMessage =  ='Welcome home, you just got off the school bus and your parents are not home. You have to get in the house by yourself through the garage, you mom left the garage unlocked for you to get in, all you have to do is wash up, eat a snack and go relax in your room\n.';//make sure to include your commands somewhere in this intro so the user knows what they can do and maybe give them a question to answer or some sort of tutorial question
  let answer = await ask(welcomeMessage);
  let answer = await ask('>_');
  playerCommands(answer);

}

let currentRoom = 'Main St.';

const rooms = {
  'Main St.': {
    description:
      'You are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.',
    connections: {
      door: 'Foyer',
    },
  },
  Foyer: {
    description:
      "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy vocabulary, and just call it a foyer.\nAnyways, it's definitely not a mudroom.\nA copy of the local paper lies in a corner.",
    connections: {
      door: 'Main St.',
    },
    inventory: ['newspaper'],
  },
};

const player = {
  inventory: [],
};

async function start() {
  console.log(rooms[currentRoom].description);
  let answer = await ask('>_');
  while (answer !== 'exit') {
    let [action, target] = answer.split(' ');
    switch (action) {
      case 'take':
        takeItem(target);
        break;
      case 'read':
        readItem(target);
        break;
      case 'open':
        openDoor(target);
        break;
      case 'inventory':
        showInventory();
        break;
      default:
        console.log(`Sorry, I don't know how to ${action} ${target}`);
        break;
    }
    answer = await ask('>_');
  }
  rl.close();
}

function takeItem(item) {
  if (rooms[currentRoom].inventory.includes(item)) {
    player.inventory.push(item);
    rooms[currentRoom].inventory = rooms[currentRoom].inventory.filter(
      (i) => i !== item,
    );
    console.log(`You take the ${item}`);
  } else {
    console.log(`There is no ${item} here to take`);
  }
}

function readItem(item) {
  if (item === 'sign' && currentRoom === 'Main St.') {
    console.log(
      'The sign says "Welcome to Burlington Code Academy!\nCome on up to the third floor.\nIf the door is locked, use the code 12345."',
    );
  } else {
    console.log(`There is no ${item} here to read`);
  }
}

function openDoor() {
  if (currentRoom === 'Main St.' && !player.inventory.includes('keypad')) {
    console.log('The door is locked. There is a keypad on the door handle.');
  } else {
    console.log('The door opens.');
    currentRoom = 'Foyer';
    console.log(rooms[currentRoom].description);
  }
}

function showInventory() {
  if (player.inventory.length === 0) {
    console.log('You are not carrying anything.');
  } else {
    console.log('You are carrying:');
    player.inventory.forEach((item) => console.log(item));
  }
}

start();

