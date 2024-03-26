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
  process.exit();

  function playerCommands(command) {
    switch (command) {
      case 'enter':
        console.log('Enter the garage code in to the code pad.');
        break;
      case 'move':
        console.log('Move to the next room.');
        break;
      case 'open':
        console.log('Open the door to get in.');
        break;
      case 'grabItem':
        console.log('Grab the ham, cheese and bread to make a sandwich.');
        break;
      case 'putItemAway':
        console.log('Put away the ham and cheese.');
        break;
      case 'read':
        console.log('Read the garage code that is printed under the rock.');
        break;
      default:
        console.log(`Sorry, I don't understand '${command}'`);

        // Ask for the next move
        ask('Enter the next move >\n').then((newInput) => {
          playerCommands(newInput.trim());
        });
        break;
    }
  }

  async function start() {
    const command = await ask('Enter a command: ');
    playerCommands(command.trim());
  }
}

class room {
  constructor(description, items, exit) {
    (this.description = description),
      (this.items = items),
      (this.name = name),
      (this.exit = exit);
  }
}
console.log(constructor);

function roomDescription(currentRoom) {
  switch (currentRoom) {
    case 'driveway':
      console.log(
        'walking up the driveway to the garage there will be a code pad, you need to enter the 4 digit password to open the garage. The code is carved into the back of the rock that is in the flower bed on the side of the garage and in front of the house, pick up that rock and flip it over and enter that code.',
      );

    case 'garage':
      console.log(
        'Now that you are in the garage, you want to get into the house. There are two doors one front of you and one to the right of you one of them leads to the basement in side the house and from there you will find the bathroom to wash up. The door on your right will open up the basement door.',
      );

    case 'basement':
      console.log(
        'You have entered the house now inside the basement, as you can see across the basement there is a doorway. You want to head towards there and there will be a door on your left and a staircase to your right, the door on you left will be the bathroom',
      );

    case 'bathroom':
      console.log(
        "Wash up from being at school all day so you don't spread germs all over the house, the soap, washcloth, and dry towel is right there for you.",
      );

    case 'kitchen':
      console.log(
        'now that you have washed up you want to get some food, when you exit the bathroom take the staircase up stairs to the kitchen. In side the refrigerator is the ham and cheese, and the bread is on top of the counter, make a sandwich and head to the bedroom.',
      );

    case 'bedroom':
      console.log(
        'when you leave the kitchen take a right and down the hall there are three doors two on the left and one on the right. your room is the last door on the left where your desk and gaming chair is, enjoy your sandwich and relax.',
      );
  }
}

// console.log(roomDescription);

let currentRoom = 'driveway';

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



function showTextNode(){}

const textNode(){}



function moveRoom(newRoom) {
  if (roomState[currentRoom].includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You are now in the ${currentRoom}`);
  } else {
    console.log("You can't go there from here.");
  }
}

async function start() {
  const command = await ask('Enter a command: ');
  playerCommands(command.trim());
}

