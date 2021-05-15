//define UI Element

let form = document.getElementById('add_task_form');
let input_task = document.getElementById('new_task');
let AllTask = document.getElementById('all_task');
let ClearTask = document.getElementById('clear_task');
let FilterTask = document.getElementById('filter_task');

//event listener
form.addEventListener('submit', TaskAdd);
AllTask.addEventListener('click', RemoveTask);
ClearTask.addEventListener('click', ClearAllTask);
FilterTask.addEventListener('keyup', FilteringTask);
document.addEventListener('DOMContentLoaded', SaveTasks);


//Define method
//Add Task
function TaskAdd(e){

    if(input_task.value === ''){
        alert('Task field is empty!');
    }else{
        let li = document.createElement('li');//Creates an instance of the element for the specified tag
        li.appendChild(document.createTextNode(input_task.value+ " "));//creteTextNode Creates a text string from the specified value
        let cross_button = document.createElement('a');
        cross_button.setAttribute('href', '#');
        cross_button.innerHTML = 'remove';
        li.appendChild(cross_button);
        AllTask.appendChild(li);

        StoreTaskLocalStorage(input_task.value);

        input_task.value = '';
    }
    e.preventDefault();//itprevents to reload the form
}


//Remove Task Method

function RemoveTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let element = e.target.parentElement;
            element.remove();

            RemoveFromLocalStorage(element); //this sfunction parmanently remove data from local storage
        }
        
    }
    
}

//Clear All Task

function ClearAllTask(){
    if(confirm('Are you sure to clear all task list?')){
        AllTask.innerHTML = '';
        localStorage. clear();//this function permanantly delete data from local storage
    }
    

    //this is the another way to clear all task list
    // while(AllTask.firstChild){
    //     AllTask.removeChild(AllTask.firstChild);
       
    // }
    
    
    
}


//Filter Task
function FilteringTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        console.log(item);

        if(item.toLowerCase().indexOf(text)!= -1){ //here -1 means if data is not empty
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}


//Task store in Local Storage

function StoreTaskLocalStorage(everyTask){
    let tasksss;
    if(localStorage.getItem('tasksss')=== null){
        tasksss=[];
    }else{
        tasksss = JSON.parse(localStorage.getItem('tasksss')); //parsing from JSON object to string
    }
    tasksss.push(everyTask);
    localStorage.setItem('tasksss', JSON.stringify(tasksss));//covertng the all values to JSON object from string
}


//Save Tasks in display

function SaveTasks(){
    let tasksss;
    if(localStorage.getItem('tasksss')=== null){
        tasksss=[];
    }else{
        tasksss = JSON.parse(localStorage.getItem('tasksss')); //parsing from JSON object to string
    }

    tasksss.forEach(task => {

        let li = document.createElement('li');//Creates an instance of the element for the specified tag
        li.appendChild(document.createTextNode(task + " "));//creteTextNode Creates a text string from the specified value
        let cross_button = document.createElement('a');
        cross_button.setAttribute('href', '#');
        cross_button.innerHTML = 'remove';
        li.appendChild(cross_button);
        AllTask.appendChild(li);

    })
}


//remove from local storage

function RemoveFromLocalStorage(taskItem){
    let tasksss;
    if(localStorage.getItem('tasksss')=== null){
        tasksss=[];
    }else{
        tasksss = JSON.parse(localStorage.getItem('tasksss')); //parsing from JSON object to string
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasksss.forEach((task , index) => {
        if(li.textContent.trim() === task){ //trim() function remove space before & after data
            tasksss.splice(index, 1);
        }
    });

    localStorage.setItem('tasksss', JSON.stringify(tasksss));
}