// const width_input = document.getElementById('width').value;
// const height_input = document.getElementById('height').value;
// const maze_innput = document.getElementById('labirynt').value; 


function Labirynth(m_height, m_width, m_proj){
  this.mazeHeight = m_height;
  this.mazeWidth = m_width;
  this.mazeProj = m_proj;
}



function createTable(str){
  let dispTable = document.getElementById('displayTable');
  let tableRow = document.createElement('tr');
  dispTable.appendChild(tableRow);
  for(i = 0; i < str.length; i++){
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
