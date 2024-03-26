const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//OVERALL::: somewhere in your game should be a win condition (gathering some items, numbers, finding a door, or something else doesnt matter what) and if that cond't is met then tell the user they won
async function start() { //make sure to call function at bottom of page
  const welcomeMessage = `You just got off the bus from school, no one is home you have to get in the house by yourself
  through the garage, wash up, eat a snack and go relax in your room.`;//make sure to include your commands somewhere in this intro so the user knows what they can do and maybe give them a question to answer or some sort of tutorial question
  let answer = await ask(welcomeMessage);
  process.exit();//change this to call playerCommands(answer)

  function playerCommands(command) {//sanitize input of command within function and change your cases accordingly
    switch (command) {//after handling other comments go into your cases and have them do more than just a console.log, i.e move should call moveRoom(); console.log() should be used solely for user feedback so they know their action had an effect
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

        // Ask for the next move <- instead of asking for the next move, we should re-read the currentRoom description and then call playerPrompt()
        ask('Enter the next move >\n').then((newInput) => {
          playerCommands(newInput.trim());
        });
        break;
    }
  }

  async function start() {//change or remove this function to not be the same as the function below the showTextNode function and the roomState object
    const command = await ask('Enter a command: ');
    playerCommands(command.trim());
  }
}

class room {//make sure to capitalize class names  <-- also is currently unused
  constructor(description, items, exit) {
    (this.description = description),
      (this.items = items),
      (this.name = name),
      (this.exit = exit);
  }
}// to use the class constructor do : let exampleRoom = new room(exampleDescription, exampleItems, exampleExits) <- is similar to room.exampleRoom={exampleDescription: "ex",etc}
console.log(constructor);

function roomDescription(currentRoom) {//in your descriptions, make sure to add the command name after its associated command (with a parentheses) for each potential action within that room
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

let currentRoom = 'driveway';//make sure to instantiate this variable BEFORE any functions that require it (recommend, to put directly above roomDescription() AND moveRoom())

roomLookUp = {//this need to be an instantiation (meaning let roomLookUp={some info})
  driveway: 'driveway',
  garage: 'garage',
  basement: 'basement',
  bathroom: 'bathroom',
  kitchen: 'kitchen',
  bedroom: 'bedroom',
};

roomState = {//this need to be an instantiation (meaning let roomState={some info})
  driveway: ['garage'],
  garage: ['basement'],
  basement: ['bathroom'],
  bathroom: ['kitchen', 'bedroom'],
  kitchen: ['bathroom', 'bedroom'],
  bedroom: [],
};



function showTextNode(){}//currently does not serve a purpose, if a purpose is found then keep and leave a comment saying what purpose and where

const textNode(){}



function moveRoom(newRoom) {//would recommend to add a call to roomDescription after a succesful move of rooms and a call to playerPrompt after an UNsuccessful move of rooms
  if (roomState[currentRoom].includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You are now in the ${currentRoom}`);
  } else {
    console.log("You can't go there from here.");
  }
}

async function start() {//change function name to something like playerPrompt for clarity and to avoid errors
  const command = await ask('Enter a command: ');
  playerCommands(command.trim());
}

