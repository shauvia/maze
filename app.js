// const width_input = document.getElementById('width').value;
// const height_input = document.getElementById('height').value;
// const maze_innput = document.getElementById('labirynt').value; 


function Labirynth(m_height, m_width, m_proj){
  this.mazeHeight = m_height;
  this.mazeWidth = m_width;
  this.mazeProj = m_proj;
}

function Field(is_wall, is_entrance, is_exit){
  this.is_wall = is_wall;
  this.is_entrance = is_entrance;
  this.is_exit = is_exit;
}

function labirynth(str){
  let oneMazeRow = []
  let maze = [];
  for (let i = 0; i <= str.length; i++){
    console.log('str[i]', str[i]);
    if(i === str.length){
      console.log(oneMazeRow);
      if(oneMazeRow.length === 0){
        console.log("empty Row");
        return maze;
      } else{
        console.log("eqq");
        maze.push(oneMazeRow);
        return maze;
      }  
    }
    if(str[i]==='\n'){ 
      maze.push(oneMazeRow);
      oneMazeRow = []
      // console.log('1stIf: oneMazeRow', oneMazeRow);
      //  
    } else {
      if(str[i] === 'x'){
        let newField = new Field(true, false, false);
        console.log('X: newField', newField);
        oneMazeRow.push(newField);
      } else if(str[i] === ' '){
        let newField = new Field(false, false, false);
        console.log('space: newField', newField);
        oneMazeRow.push(newField);
      } else if(str[i] === '@'){
        newField = new Field(false, true, false);
        console.log('@: newField', newField)
        oneMazeRow.push(newField);
      } else if(str[i] === '$'){
        newField = new Field(false, false, true);
        console.log('$: newField', newField)
        oneMazeRow.push(newField);
      }
    }  
  }
  return maze;
}

// zrobić funkcję, która bierze String, sprawdza, czy dana litera stringa jest np 'x' i jeśli TrackEvent, to tworzy obiekt field z paremetrami: true, false, false i wpycha ten obiekt do listy.


function createTable(str){
  let dispTable = document.getElementById('displayTable');
  let tableRow = document.createElement('tr');
  dispTable.appendChild(tableRow);
  for(let i = 0; i < str.length; i++){
    console.log('str[i]', str[i]);
    if(str[i]=== '\n'){
      tableRow = document.createElement('tr');
      dispTable.appendChild(tableRow);
    } else {
      tableData = document.createElement('td');
      tableData.textContent = '';
      tableRow.appendChild(tableData);
      console.log('doingTable');
      if(str[i]==='x'){
        tableData.className = 'mazeWall';
      } else if(str[i]===' '){
        tableData.className = 'noWall';
      } else if (str[i]==='@'){
        tableData.className = 'enterMaze';
      } else if(str[i]==='$'){
        tableData.className = 'exitMaze';
      }  
    }
  }
}



// textarea input an array or sting??

function createLabirynth(event){
  event.preventDefault();

  let width_input = event.target.width.value;
  let height_input = event.target.height.value;
  let maze_innput = event.target.labirynt.value;
  
  let userMaze = new Labirynth(width_input, height_input, maze_innput);
  createTable(userMaze.mazeProj);
  console.log(userMaze);
  console.log(userMaze.mazeProj);
}

// console.log(userMaze.mazeProj);
addEventListener('submit', createLabirynth);
