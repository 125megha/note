const addButton=document.querySelector('#addnote');
//put the data into local storage
const updateLSData = () => {
    const textareaData=document.querySelectorAll('textarea');
    const notes = [];
    textareaData.forEach(textarea => notes.push(textarea.value));
    localStorage.setItem('notes',JSON.stringify(notes));
}
const addNewNode =(text='') =>{
const currentDate = new Date().toLocaleString();
const note=document.createElement('div');//creating class
note.classList.add('note');//adding class to that element
const  htmlData=` <div class="operation">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main ${text ? "":"hidden"}"></div>
<div class="date">${currentDate}</div>
<textarea class="${text ? "hidden" :""}"></textarea>`//making code in template form
note.insertAdjacentHTML('afterbegin',htmlData);//adding html code inside div
const edit=note.querySelector('.edit');
const deletebutton=note.querySelector('.delete');
const textarea=note.querySelector('textarea');
const mainDiv=note.querySelector('.main');
const dateDiv = note.querySelector('.date');
deletebutton.addEventListener('click',() => {
 note.remove();
 updateLSData();
})
textarea.value=text;
mainDiv.innerHTML=text;
edit.addEventListener('click',() => {
    mainDiv.classList.toggle('hidden');
   textarea.classList.toggle('hidden');
})
textarea.addEventListener('change',(event)=>{
const value=event.target.value;
mainDiv.innerHTML=value;
const updatedDate = new Date().toLocaleString();
dateDiv.textContent = `Last Updated: ${updatedDate}`;
updateLSData();
})
document.body.appendChild(note);
}
//getting data back from local storage
const notes=JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=>addNewNode(note))}
addButton.addEventListener('click',() => addNewNode());
