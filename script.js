const inputValueTask = document.querySelector("#input-value-task");
const taskSubmit = document.querySelector("#task-submit");
const cardTask = document.querySelector(".card-task");
const inputSearch = document.querySelector("#input-search");
const selectOptions = document.querySelector("#select-options");
    
let selectValue = 'all';

searchTask = ({text, select}) => {

    select = selectValue;

    seeAllTodos = () => {

        console.log('ALL TODOS');

        const todoAll = document.querySelectorAll(".task"); 
        
        if(!inputSearch.value){
            todoAll.forEach((todo) => {
                todo.style.display = '';
            });
        }
        
    }

    seeDoneTodos = () => {

        const todoDone = document.querySelectorAll(".task"); 

        console.log("Done Todos")
  
        todoDone.forEach((todo) => {

            console.log(todo);

            if(todo.classList.contains("done")){
                todo.style.display = ''
       
            }else{
                todo.style.display = 'none';
            }
            
        })        
    }

    seeNotDoneTodos = () => {

        const todoNotDone = document.querySelectorAll(".task"); 
  
        todoNotDone.forEach((todo) => {

            console.log(todo);

            if(!todo.classList.contains("done")){
                todo.style.display = ''
       
            }else{
                todo.style.display = 'none'
            }
            
        })        
    }

    switch(select){
        case 'all':
            seeAllTodos();
            break;
        case 'open':
            seeNotDoneTodos();
            break;
        case 'done':
            seeDoneTodos();
            break;
        default: break;
    }



    if(text && select == 'all'){

        console.log("ENTROU EM ALL");

        const todoAll = document.querySelectorAll(".task");  

        todoAll.forEach((todoAll) => {
    
        const textSearch = todoAll.querySelector("p").innerText.toLocaleLowerCase();
                
            if(!textSearch.includes(text)){
                    todoAll.style.display = 'none';
                }else{
                    todoAll.style.display = '';
                }
                
            });
            
    }else if(select == 'all'){
        seeAllTodos();
    }

    if(text && select == 'open'){

        const todoOpen = document.querySelectorAll(".task");  

        todoOpen.forEach((todo) => {
    
        const textSearch = todo.querySelector("p").innerText.toLocaleLowerCase();
                
            if(textSearch.includes(text) && !todo.classList.contains("done")){
                    todo.style.display = '';
                }else{
                    todo.style.display = 'none';
                }
                
            });
            
    }

    if(text && select == 'done'){

        const todoDone = document.querySelectorAll(".task");  

        todoDone.forEach((todoDone) => {
    
        const textSearch = todoDone.querySelector("p").innerText.toLocaleLowerCase();
                
            if(textSearch.includes(text) && todoDone.classList.contains('done')){
                    todoDone.style.display = '';
                }else{
                    todoDone.style.display = 'none';
                }
                
            });
            
    }
        
}



selectOptions.addEventListener("change", () => {
   
    if(selectOptions.value != ''){
        selectValue = selectOptions.value;
    }
    
    
    searchTask({select: selectValue});

})


inputSearch.addEventListener("keyup", (e) => {

    const searchText = e.target.value;
    searchTask({text: searchText});

});

cardTask.addEventListener("click", (e) => {

    const buttonTask = e.target;
    const parentEl = buttonTask.closest("div");
    const editInputTask = parentEl.querySelector("#edit-task-input");
    const warmMenssageDoneTask = parentEl.querySelector(".warmMenssageDoneTask");
    const textTask = parentEl.querySelector(".taks-title");
   
    if(buttonTask.classList.contains("task-check-button")){
   
           if(!editInputTask.classList.contains('hide')){
               if(editInputTask.value){
   
                  
                   const newText = editInputTask.value;
   
                   parentEl.querySelector("p").innerText = newText;
   
                   console.log(parentEl);
   
                   warmMenssageDoneTask.classList.add("hide");
                   editInputTask.classList.toggle("hide");
                   textTask.classList.toggle("hide");
   
                   editInputTask.value = ''
               }
           }else{
               parentEl.classList.toggle("done");
               warmMenssageDoneTask.classList.add("hide");
           }
       
   
    }
   
    if(buttonTask.classList.contains("task-pen-button")){
   
       const taskIsDone = parentEl.classList.value;
   
       console.log(taskIsDone);
   
       if( taskIsDone != 'task done'){
   
   
           textTask.classList.toggle("hide")
           editInputTask.classList.toggle("hide")
          
   
       }else{
           
           console.log(warmMenssageDoneTask);
           warmMenssageDoneTask.classList.remove("hide");
       }
   
   
    }
   
    if(buttonTask.classList.contains("task-trash-button")){
       parentEl.remove();
    }
   
   });


taskSubmit.addEventListener("click", (e) => {

    if(inputValueTask.value){

        const taskTitle = inputValueTask.value;

        const newTask = `
        
      <div class="card-task">

            
            <div class="task">

                <div class="taks-title">
                    <p>${taskTitle}</p>
                </div>
                
                <input type="text" class="hide" id="edit-task-input" placeholder="Digite para editar...">
                
                <ul>
                    <li>
                        <button class="task-button-icons task-check-button">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </li>
                    <li>
                        <button class="task-button-icons task-pen-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </li>
                    <li>
                        <button class="task-button-icons task-trash-button">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </li>
                </ul>

                <p class="warmMenssageDoneTask hide">retire o concluído para modificar</p>
            
            </div>

           

    </div>
        `

            const parser = new DOMParser();
            const doc = parser.parseFromString(newTask, 'text/html');

            const newTaskDom = doc.querySelector('.task')

            cardTask.appendChild(newTaskDom);

            inputValueTask.value = '';

            inputValueTask.focus();

          
    }
    
});





