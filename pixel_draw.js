
const high_container_block = document.getElementById('wrapper');
const xXx = 80;
const size_of_brick = '10px';
let color = '#000000';


function built_table(){
  let block_to_insert_div = document.createElement('div');
  block_to_insert_div.setAttribute("id", "papa");
  for(let j=0; j<xXx/2; j++)
    block_to_insert_div.appendChild(build_row(j));
  high_container_block.appendChild(block_to_insert_div)
  return;
}


function build_row(row){
  let block_to_insert_div = document.createElement('div');
  block_to_insert_div.setAttribute("class", "row");
  block_to_insert_div.style['text-align']  = 'center';
  block_to_insert_div.setAttribute("id", "row_" + row);
  for(let i=0; i<xXx; i++)
    block_to_insert_div.appendChild(build_node(i, row));
  return block_to_insert_div
}


function build_node(number, row){
  let block_to_insert_div = document.createElement('div');
  block_to_insert_div.setAttribute("id", "node_" + number + "_row_" + row);
  block_to_insert_div.setAttribute("class", "node");
  block_to_insert_div.style['background-color']  = '#ffffff';
  block_to_insert_div.style['height']  = `${size_of_brick}`;
  block_to_insert_div.style['width']  = `${size_of_brick}`;
  block_to_insert_div.innerHTML = ' '
  block_to_insert_div.style['display']  = 'inline-block';
  block_to_insert_div.style['-moz-box-shadow'] = 'inset 0 0 1px #eaeaea';
  block_to_insert_div.style['-webkit-box-shadow'] = 'inset 0 0 1px #eaeaea';
  block_to_insert_div.style['box-shadow'] ='inset 0 0 1px #eaeaea';
  return block_to_insert_div;
}

built_table()

const set_black = function(toblack) {
  toblack.style['background-color'] = `${color}`;
  if(color !== '#ffffff') {
    toblack.style['-moz-box-shadow'] ='none';
    toblack.style['-webkit-box-shadow'] ='none';
    toblack.style['box-shadow'] ='none';
  }
  else{
    toblack.style['-moz-box-shadow'] = 'inset 0 0 1px #eaeaea';
    toblack.style['-webkit-box-shadow'] = 'inset 0 0 1px #eaeaea';
    toblack.style['box-shadow'] ='inset 0 0 1px #eaeaea';
  }
}

function printMousePos(event) {
  let current = document.elementFromPoint(event.clientX, event.clientY)
  if(current.getAttribute('class') === "node")
    set_black(current);
}

document.addEventListener("click", printMousePos);

window.addEventListener("mousedown", function(event) {
  let current = document.elementFromPoint(event.clientX, event.clientY)
  if(current.getAttribute('class') === "node") {
    set_black(current);
    window.addEventListener("mousemove", moved);
    event.preventDefault(); // Prevent selection
  }
});

function buttonPressed(event) {
  if (event.buttons == null)
    return event.which != 0;
  else
    return event.buttons != 0;
}

function moved(event) {
  if (!buttonPressed(event)) {
    window.removeEventListener("mousemove", moved);
  } else {
    let current = document.elementFromPoint(event.clientX, event.clientY)
    if(current.getAttribute('class') === "node"){
      set_black(current);
    }  
  }
}

let colorPicker = document.getElementById('choose_color_body');
colorPicker.addEventListener("input", (event)=>color=event.target.value, false);
colorPicker.addEventListener("change", (event)=>color=event.target.value, false);


document.getElementById('input_button_clear').addEventListener('click', function (event) {
  high_container_block.innerHTML=''
  built_table()
});