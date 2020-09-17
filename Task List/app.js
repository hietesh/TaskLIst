//get all the dom elements
const taskValue = document.querySelector('#task-val');
const submitButton = document.querySelector('.task-submit');
const filterVal = document.querySelector("#task-filter");
const clearTasks = document.querySelector("#clear-task"); 
const collection = document.querySelector(".collection");

//events on the doms
allEventListeners();

function allEventListeners(){
   document.addEventListener('DOMContentLoaded',getTasks);
   submitButton.addEventListener('click',taskEnter);
   collection.addEventListener('click',removeTask); 
   clearTasks.addEventListener('click',clearTask);
   filterVal.addEventListener('keyup',filterTasks);
}
 
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks')===null){
     tasks = []; 
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   
   tasks.forEach(function(task){
      const li = document.createElement('li');
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      collection.appendChild(li);
      taskValue.value='';  
   });
}

function storeTaskInLocalStorage(task){
   let tasks;
   console.log(localStorage.getItem('tasks'));
   if(localStorage.getItem('tasks')===null){
     tasks = []; 
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);
   console.log(tasks);
   localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTaskfromLocalStorage(taskItem){
   let tasks;
   //console.log(localStorage.getItem('tasks'));
   if(localStorage.getItem('tasks')===null){
     tasks = []; 
   }
   else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   console.log(tasks);
   tasks.forEach(function(task,index){
      if(taskItem.textContent === task){
         tasks.splice(index,1);
      }
   });
   localStorage.setItem('tasks',JSON.stringify(tasks));
}


function taskEnter(e){
   if(taskValue.value.trim()===''){
      alert('Add a Task');
   }
   else{
    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskValue.value.trim()));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    collection.appendChild(li);
    storeTaskInLocalStorage(taskValue.value.trim());
    taskValue.value='';    
   }
   e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      e.target.parentElement.parentElement.remove(); 
      console.log(e.target);  
      removeTaskfromLocalStorage(e.target.parentElement.parentElement); 
    }
}
 
function clearTask(e){
   while(collection.firstChild){
      collection.removeChild(collection.firstChild);
   }
   localStorage.clear();
}

function filterTasks(e){
   const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(
      function(task){
         const item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
         }else{
            task.style.display = 'none';
         }
      }
   );
}