
const high_container_block = document.getElementById('wrapper');
const net_block = document.getElementById('net');
const xXx = 80;
const size_of_brick = '10px';
let color = '#000000';

//------------------------------

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

function set_brick_style(block_to_insert_div){
  block_to_insert_div.style['background-color']  = '#ffffff';
  block_to_insert_div.style['height']  = `${size_of_brick}`;
  block_to_insert_div.style['width']  = `${size_of_brick}`;
  block_to_insert_div.innerHTML = ' '
  block_to_insert_div.style['display']  = 'inline-block';
  block_to_insert_div.style['-moz-box-shadow'] = 'inset 0 0 1px #eaeaea';
  block_to_insert_div.style['-webkit-box-shadow'] = 'inset 0 0 1px #eaeaea';
  block_to_insert_div.style['box-shadow'] ='inset 0 0 1px #eaeaea';
}


function build_node(number, row){
  let block_to_insert_div = document.createElement('div');
  block_to_insert_div.setAttribute("id", "node_" + number + "_row_" + row);
  block_to_insert_div.setAttribute("class", "node");
  set_brick_style(block_to_insert_div)
  return block_to_insert_div;
}

//------------------------------

built_table()

//------------------------------

const set_color = function(toblack) {
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

//------------------------------

function printMousePos(event) {
  let current = document.elementFromPoint(event.clientX, event.clientY)
  if(current.getAttribute('class') === "node")
    set_color(current);
}

document.addEventListener("click", printMousePos);

//------------------------------

window.addEventListener("mousedown", function(event) {
  let current = document.elementFromPoint(event.clientX, event.clientY)
  if(current.getAttribute('class') === "node") {
    set_color(current);
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
      set_color(current);
    }  
  }
}

//------------------------------

let colorPicker = document.getElementById('choose_color_body');
colorPicker.addEventListener("input", (event)=>color=event.target.value, false);
colorPicker.addEventListener("change", (event)=>color=event.target.value, false);

//------------------------------

document.getElementById('input_button_clear').addEventListener('click', function (event) {
  high_container_block.innerHTML=''
  built_table()
});


//------------------------------

let CL = document.getElementById('choose_color_body');

function setColorDot(event) {
  let current = document.elementFromPoint(event.clientX, event.clientY)
  if(current.id === "opt"){
    color = current.value;   
    CL.value = current.value;
  }
    
}

document.addEventListener("click", setColorDot);

//------------------------------


 function download(filename, textInput) {
  var element = document.createElement('a');
  element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  //document.body.removeChild(element);
}

document.getElementById("input_button_save").addEventListener("click", function () {
  var new_div = document.createElement('div');
  var text = document.getElementById('wrapper').cloneNode(true);
  new_div.appendChild(text)
  var filename = "output.html";
  download(filename, new_div.innerHTML);
 }, false);


//------------------------------

function handleFileSelect(input) {

  let file = input.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  
  reader.onloadend = function() {
    document.getElementById('wrapper').remove();
    net_block.innerHTML = reader.result + net_block.innerHTML;
  };

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);