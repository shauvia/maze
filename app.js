function Field(is_wall, is_entrance, is_exit){
  this.is_wall = is_wall;
  this.is_entrance = is_entrance;
  this.is_exit = is_exit;
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
      table.appendChild(tableRow);
    }  
  }
}

function drawPawn(pawn){
  let y = pawn.y.toString();
  let x = pawn.x.toString();
  let yx = y + ',' + x;
  let findID = document.getElementById(yx);
  findID.textContent = 'PGG';
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

function proceedRandomlyToExit(){
  let count = 0;
  let isExit = isPawnAtExit(mazeModel, pawn.y,pawn.x);
  while(isExit !== true){
    let posArr = validPositions(mazeModel);
    let randomPosition = randomMove(posArr);
    pawn.moveToNewPosition(randomPosition[0], randomPosition[1]); 
    isExit = isPawnAtExit(mazeModel, pawn.y,pawn.x);
    count += 1 
  }
  console.log('count', count);
}

function scrollDownToView() {
  var elmnt = document.getElementsByClassName("tableArrs");
  console.log('elmnt', elmnt);
  elmnt[0].scrollIntoView();
}

var mazeModel, entrance, pawn;

function createLabirynth(event){
  event.preventDefault();

  let width_input = event.target.width.value;
  let height_input = event.target.height.value;
  let maze_input = event.target.labirynt.value;

  mazeModel = labirynth(maze_input);
  entrance = findEntrance(mazeModel);
  pawn = new Pawn(entrance[0],entrance[1]);
  drawEverything(mazeModel, pawn);
  showMazeAndControls();
  scrollDownToView();
}

addEventListener('submit', createLabirynth);


function movePawn(event){
  let arrow = event.target.id;
  let newCoordinates = pawn.getNewPosition(arrow);
  let isValid = isPawnPositionValid(mazeModel, newCoordinates[0],newCoordinates[1]);
  if(arrow === 'random'){
    proceedRandomlyToExit()
  } else if (isValid === false){
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

let buttopUp = document.getElementById('up');
let buttopDown = document.getElementById('down');
let buttonLeft = document.getElementById('left');
let buttonRight = document.getElementById('right');
let buttonRandom = document.getElementById('random')

buttopUp.addEventListener('click', movePawn);
buttopDown.addEventListener('click', movePawn);
buttonLeft.addEventListener('click', movePawn);
buttonRight.addEventListener('click', movePawn);
buttonRandom.addEventListener('click', movePawn);





// 1.listener na każdym przycisku;
// 2.pionek idzie go góry - uruchomiona funkcja w obiekcie pionek; (f-cja idzie w góre, dół, prawo, lewo)
// 3. Zapamietanie nowego miejsca w obiekcie pionek;
// 4. Wyrysowanie pionka w nowym miejscu.
// później zrobić f-cję, która sprawdza, czy pionek może gdzieś iść, czy nie wychodzi poza labirynt(y, x =0), albo w prawo i w dół oraz czy nie ma tam sciany !!!!!

// Do zrobienia:
// -aby się przesuwało w dół po kliknięciu przycisku formularza;
