//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const todoListdelete = document.querySelector('.todoList-delete');


//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
todoListdelete.addEventListener('click',deleteTodos);


//functions
function addTodo(event){
	//prevents form default action, here its is submitting form
	event.preventDefault();
	// console.log('hello');
	if((todoInput.value != "") && ( todoInput.value != " " )){
		// todo DIV
	const todoDiv =document.createElement('div');
	todoDiv.classList.add('todo');

	// crete li
	const newTodo= document.createElement('li');
	newTodo.innerText=todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	//add todo to the local storage
	saveLocalTodos(todoInput.value);
	
	
	//check mark button
	const completedButton= document.createElement('button');
	completedButton.innerHTML ='<i class="fas fa-check"></i>';
	completedButton.classList.add('completed-btn');
	todoDiv.appendChild(completedButton);


	//trash button
	const trashButton= document.createElement('button');
	trashButton.innerHTML ='<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	//append to list
	todoList.appendChild(todoDiv);

	todoInput.value="";
	}
	
}

function deleteCheck(event){
	// to know what we are clicking on
	console.log(event.target);

	const item = event.target;

	//clicking on trash button 
	if(item.classList[0]==='trash-btn'){
		// console.log('delete button');
		const todo =item.parentElement;
		todo.classList.add('fall');
		
		
		todo_item=todo.querySelector('.todo-item').innerText;
		console.log(todo_item);
		deleteTodo(todo_item);

		// setTimeout(function(){
		// 	todo.remove();
		// },300);
		//waits til transition is finished and then executes the function
		todo.addEventListener("transitionend", function(){
			todo.remove();
		});

	}

	//clicking on check button
	if(item.classList[0]==='completed-btn'){
		const todo =item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodo(e){
	const todos= todoList.childNodes;
	console.log(todos);
	// donno why a text element is getting added inside the list before the first div
	// todos.forEach(function(todo){
	// 	switch(e.target.value){
	// 		case "all" :
	// 			todo.style.display='flex';
	// 			break;
	// 		case "completed":
	// 			if(todo.classList.contains('completed')){
	// 				todo.style.display='flex';
	// 			}
	// 			else{
	// 				todo.style.display='none';
	// 			}
	// 			break;
	// 		case "uncompleted":
	// 			if(todo.classList.contains('completed')){
	// 				todo.style.display='none';
	// 			}
	// 			else{
	// 				todo.style.display='flex';
	// 			}
	// 			break;
	// 	}
	// });

	for(let i=1;i<todos.length;i++){
		var todo=todos[i];
		switch(e.target.value){
			case "all" :
				todo.style.display='flex';
				break;
			case "completed":
				if(todo.classList.contains('completed')){
					todo.style.display='flex';
				}
				else{
					todo.style.display='none';
				}
				break;
			case "uncompleted":
				if(todo.classList.contains('completed')){
					todo.style.display='none';
				}
				else{
					todo.style.display='flex';
				}
				break;
		}
	}

	
}

function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem('todos'));
	}



	//for loading all elements ig
	todos.forEach(function(todo){
		const todoDiv =document.createElement('div');
		todoDiv.classList.add('todo');

		// crete li
		const newTodo= document.createElement('li');
		newTodo.innerText=todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);

		//check mark button
		const completedButton= document.createElement('button');
		completedButton.innerHTML ='<i class="fas fa-check"></i>';
		completedButton.classList.add('completed-btn');
		todoDiv.appendChild(completedButton);
		//trash button
		const trashButton= document.createElement('button');
		trashButton.innerHTML ='<i class="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);

		//append to list
		todoList.appendChild(todoDiv);
	});

}

function deleteTodos(todo){
	localStorage.clear();
	location.reload();
}

function deleteTodo(todo){
	var  todos={};
	todos=JSON.parse(localStorage.getItem('todos'));
	console.log(todos);
	for(let i=0;i<todos.length;i++){
		if(todos[i]===todo){
			console.log('found  '+ todo);
			todos.splice(i,1);
			break;
		}
	}
	console.log(todos);
	localStorage.setItem('todos', JSON.stringify(todos));
	// location.reload();
}

