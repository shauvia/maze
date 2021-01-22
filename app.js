function Field(is_wall, is_entrance, is_exit){
  this.is_wall = is_wall;
  this.is_entrance = is_entrance;
  this.is_exit = is_exit;
  this.isVisited = false;
}

function Pawn(Y_position, X_position){
  this.y = Y_position;
  this.x = X_position;
  this.getNewPosition = function(str){
    let y = this.y;
    let x = this.x;
    if (str === 'up'){
      y = this.y-1;
    } else if (str === 'down'){
      y = this.y+1;
    } else if (str ==='left'){
      x = this.x-1;
    } else if(str === 'right') {
      x = this.x+1
    }
    return [y,x];
  }
  this.moveToNewPosition = function(y,x){
    this.y = y;
    this.x = x;
  }
}


function labirynth(str){
  let oneMazeRow = []
  let maze = [];
  for (let i = 0; i <= str.length; i++){
    // console.log('str[i]', str[i]);
    if(i === str.length){
      // console.log(oneMazeRow);
      if(oneMazeRow.length === 0){
        // console.log("empty Row");
        return maze;
      } else{
        // console.log("eqq");
        maze.push(oneMazeRow);
        return maze;
      }  
    }
    if(str[i]==='\n'){ 
      maze.push(oneMazeRow);
      oneMazeRow = []
      // console.log('1stIf: oneMazeRow', oneMazeRow);
    } else {
      if(str[i] === 'x'){
        let newField = new Field(true, false, false);
        // console.log('X: newField', newField);
        oneMazeRow.push(newField);
      } else if(str[i] === ' '){
        let newField = new Field(false, false, false);
        // console.log('space: newField', newField);
        oneMazeRow.push(newField);
      } else if(str[i] === '@'){
        newField = new Field(false, true, false);
        // console.log('@: newField', newField)
        oneMazeRow.push(newField);
      } else if(str[i] === '$'){
        newField = new Field(false, false, true);
        // console.log('$: newField', newField)
        oneMazeRow.push(newField);
      } else {
        console.log('Bledny znakd', str[i])
      }
    }  
  }
  return maze;
}

function isPawnPositionValid(maze, y, x){
  if (y < 0 || x < 0 || y === maze.length || x === maze[y].length){
    return false;
  } else if(maze[y][x].is_wall === true){
    return false;
  } else {
    return true;
  }
}

function isPawnAtExit(maze, y, x){
  if (maze[y][x].is_exit === true){
    return true;
  }
}

function findEntrance(arr){
  let coordinates = [];
  for(let i = 0; i < arr.length; i++){
    // console.log('i', i);
    for(let j = 0; j < arr[i].length; j++){
      // console.log('j', j)
      if (arr[i][j].is_entrance === true){
        let y = i;
        let x = j;
        coordinates.push(y, x);
      }
    }
  }
  return coordinates;
}


function drawTable(arr){
  let tablePlace = document.getElementById('tablePlace');
  let table = document.createElement('table');
  tablePlace.appendChild(table)
  for( let y = 0; y < arr.length; y++){
    let tableRow = document.createElement('tr');
    for (let x = 0; x < arr[y].length; x++) {
      tableData = document.createElement('td');
      tableData.textContent = '';
      tableRow.appendChild(tableData);
      if(arr[y][x].is_wall === true){
        let yStr = y.toString();
        let xStr = x.toString();
        let yxStr = yStr + ',' + xStr;
        // console.log('yxStr', yxStr);
        tableData.className = 'mazeWall';
        tableData.id = yxStr;
      } else if (arr[y][x].is_entrance === true){
        let yStr = y.toString();
        let xStr = x.toString();
        let yxStr = yStr + ',' + xStr;
        // console.log('yxStr', yxStr);
        tableData.className = 'enterMaze';
        tableData.id = yxStr;
      } else if(arr[y][x].is_exit === true){
        let yStr = y.toString();
        let xStr = x.toString();
        let yxStr = yStr + ',' + xStr;
        // console.log('yxStr', yxStr);
        tableData.className = 'exitMaze';
        tableData.id = yxStr;
      } else {
        let yStr = y.toString();
        let xStr = x.toString();
        let yxStr = yStr + ',' + xStr;
        // console.log('yxStr', yxStr);
        tableData.className = 'noWall'; 
        tableData.id = yxStr; 
      }
      if (arr[y][x].isVisited) {
        tableData.classList.add('visited');
      }
      table.appendChild(tableRow);
    }  
  }
}

function drawPawn(pawn){
  let y = pawn.y.toString();
  let x = pawn.x.toString();
  let yx = y + ',' + x;
  let findID = document.getElementById(yx);
  let img = document.createElement('img');
  img.src = 'pictures/pawn.jpg';
  img.className = 'pawnDog';
  findID.appendChild(img);
  // findID.textContent = 'PGG';
}

function showMazeAndControls(){
  let clas = document.getElementsByClassName('tableArrs');
  clas[0].classList.remove('invisible');
}

function removeTable(){
  let previousTable = document.getElementsByTagName('table');
  if (previousTable.length !== 0){
    previousTable[0].remove();
  }
}

function drawEverything(arr, pawn){
  removeTable();
  drawTable(arr);
  drawPawn(pawn);
}

function validPositions(maze){
  let directions = ['up', 'down', 'left', 'right'];
  let positionsArr = []; 
  for (let i = 0; i < directions.length; i++){
    // console.log('controls[i]', directions[i]);
    let newYX = pawn.getNewPosition(directions[i]);
    // console.log('newYX', newYX);
    let checkedPositions = isPawnPositionValid(maze, newYX[0], newYX[1]);
    if (checkedPositions === true) {
      positionsArr.push(newYX);
    } 
  }
  return positionsArr;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomMove(positionsArr){
  let randomPos = getRandomInt(positionsArr.length);
  return positionsArr[randomPos];
}

// function logPositions(posArr) {
//   console.log('positionsArr [{');
//   for (let i = 0; i < posArr.length; i++) {
//     console.log('    ', posArr[i]);
//   }
//   console.log('}');
// }

function randomMoveNotVisited(positionsArr){
  logPositions(positionsArr);
  let selectedPosArr = [];
  let randomPos = 0;

  while(positionsArr.length > 0) {
    randomPos = getRandomInt(positionsArr.length);
    let drawn = positionsArr[randomPos];
    console.log('drawn', drawn);
    console.log('pole', mazeModel[drawn[0]][drawn[1]].isVisited);
    if(mazeModel[drawn[0]][drawn[1]].isVisited === false) {
      return positionsArr[randomPos];
    } else if (mazeModel[drawn[0]][drawn[1]].isVisited === true){
      positionsArr.splice(randomPos, 1);
      console.log('wycięty', positionsArr)
      selectedPosArr.push(drawn);
      console.log('selectedPosArr', selectedPosArr);
    }  
  }
  if(positionsArr.length === 0){
    randomPos = getRandomInt(selectedPosArr.length);
    console.log('1st if, randomPos', selectedPosArr[randomPos]);
    return selectedPosArr[randomPos];
  }
}

function randomMoveNotVisited2(positionsArr) {
  let positionsNotVisited = [];
  let index = -1;
  for(let i = 0; i < positionsArr.length; i++){
    let position = positionsArr[i];
    if(mazeModel[position[0]][position[1]].isVisited === false){
      positionsNotVisited.push(position);
    }
  }
  if(positionsNotVisited.length > 0){
     index = getRandomInt(positionsNotVisited.length);
    return positionsNotVisited[index];
  } else {
    index = getRandomInt(positionsArr.length);
    return positionsArr[index];
  }
}


function randomeMoveWithBackTracking(positionsArr){
  let positionsNotVisited = [];
  let index = -1;
  for(let i = 0; i < positionsArr.length; i++){
    let position = positionsArr[i];
    if(mazeModel[position[0]][position[1]].isVisited === false){
      positionsNotVisited.push(position);
    }
  }
  if(positionsNotVisited.length > 0){
    let currentPosition = [];
    currentPosition.push(pawn.y, pawn.x);
    console.log('currentPosition', currentPosition);
    backTrackingStack.push(currentPosition);
    
    index = getRandomInt(positionsNotVisited.length);
    return positionsNotVisited[index];
  } else if (backTrackingStack.length === 0){
    return null;
  } else {
    let removed = backTrackingStack.pop()
    console.log('removed', removed);
    return removed;
  }
}


function scrollDownToView() {
  var elmnt = document.getElementsByClassName("tableArrs");
  console.log('elmnt', elmnt);
  elmnt[0].scrollIntoView();
}



function stopFunction(){
  isStopped = true;
  console.log('isStopped', isStopped);
}


function proceedRandomlyToExit(moveSelectionFunction){
  if (isAlgoritmRunning){
    alert('Użyj przycisku stop.');
    return;
  } 

  let isExit = isPawnAtExit(mazeModel, pawn.y,pawn.x);
  let delay = 50;
  isStopped = false;
  isAlgoritmRunning = true;

  let stepFunction = function() {
    let posArr = validPositions(mazeModel);
    let nextPosition = moveSelectionFunction(posArr);
    mazeModel[pawn.y][pawn.x].isVisited = true;
    if (nextPosition === null){
      alert('Przykro mi. Ten algorytm nie działa. Użyj innego.');
      isAlgoritmRunning = false;
      return;
    }
    pawn.moveToNewPosition(nextPosition[0], nextPosition[1]); 
    // console.log('nextPosition', nextPosition);
    isExit = isPawnAtExit(mazeModel, pawn.y,pawn.x);
    drawEverything(mazeModel, pawn); 
    if(isExit !== true && isStopped === false){
      setTimeout(stepFunction, delay);
    } else {
      isAlgoritmRunning = false;
    }
  }

  if(isExit !== true){
    setTimeout(stepFunction, delay);
  }
}

let isAlgoritmRunning = false;
let backTrackingStack = [];
let isStopped = false; 
var mazeModel, entrance, pawn;

function createLabirynth(event){
  event.preventDefault();

  let maze_input = event.target.labirynt.value;

  mazeModel = labirynth(maze_input);
  entrance = findEntrance(mazeModel);
  pawn = new Pawn(entrance[0],entrance[1]);
  drawEverything(mazeModel, pawn);
  showMazeAndControls();
  scrollDownToView();

  isAlgoritmRunning = false;
  backTrackingStack = [];
  isStopped = false; 
}


function movePawn(event){
  let arrow = event.target.id;
  let newCoordinates = pawn.getNewPosition(arrow);
  let isValid = isPawnPositionValid(mazeModel, newCoordinates[0], newCoordinates[1]);
  if (isValid === false){
    alert("Gdzie leziesz? Zawróć!")
  }else{ 
    pawn.moveToNewPosition(newCoordinates[0], newCoordinates[1]);
  }
  let isAtExit = isPawnAtExit(mazeModel, pawn.y,pawn.x);
  if(isAtExit === true){
    setTimeout(function () {alert('Hurra!! Koniec labiryntu');}, 100);
  }
  drawEverything(mazeModel, pawn); 
}

function movePawnRandomly(event){
  proceedRandomlyToExit(randomMove);
}
function movePawnRandomCrumbs(event){
  proceedRandomlyToExit(randomMoveNotVisited2);
}
function movePawnRandomCrumbsDFS(event){
  backTrackingStack = [];
  proceedRandomlyToExit(randomeMoveWithBackTracking);
}

function stoppingFuntion(event){
  stopFunction();
}



let buttopUp = document.getElementById('up');
let buttopDown = document.getElementById('down');
let buttonLeft = document.getElementById('left');
let buttonRight = document.getElementById('right');
let buttonRandom = document.getElementById('random');
let buttonCrumbs = document.getElementById('crumbs');
let buttonThread = document.getElementById('thread');
let buttonStop = document.getElementById('stop');

addEventListener('submit', createLabirynth);

buttopUp.addEventListener('click', movePawn);
buttopDown.addEventListener('click', movePawn);
buttonLeft.addEventListener('click', movePawn);
buttonRight.addEventListener('click', movePawn);
buttonRandom.addEventListener('click', movePawnRandomly);
buttonCrumbs.addEventListener('click', movePawnRandomCrumbs);
buttonThread.addEventListener('click', movePawnRandomCrumbsDFS);
buttonStop.addEventListener('click', stoppingFuntion);





// 1.listener na każdym przycisku;
// 2.pionek idzie go góry - uruchomiona funkcja w obiekcie pionek; (f-cja idzie w góre, dół, prawo, lewo)
// 3. Zapamietanie nowego miejsca w obiekcie pionek;
// 4. Wyrysowanie pionka w nowym miejscu.
// później zrobić f-cję, która sprawdza, czy pionek może gdzieś iść, czy nie wychodzi poza labirynt(y, x =0), albo w prawo i w dół oraz czy nie ma tam sciany !!!!!

// Do zrobienia:
// -aby się przesuwało w dół po kliknięciu przycisku formularza;
