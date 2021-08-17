//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');




//event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//functions
function addTodo(event){
	//prevents form default action, here its is submitting form
	event.preventDefault();
	// console.log('hello');

	// todo DIV
	const todoDiv =document.createElement('div');
	todoDiv.classList.add('todo');

	// crete li
	const newTodo= document.createElement('li');
	newTodo.innerText=todoInput.value;
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

	todoInput.value="";
}

function deleteCheck(event){
	// to know what we are clicking on
	// console.log(event.target);

	const item = event.target;

	//clicking on trash button 
	if(item.classList[0]==='trash-btn'){
		// console.log('delete button');
		const todo =item.parentElement;
		todo.classList.add('fall');
		
		// setTimeout(function(){
		// 	todo.remove();
		// },300);
		//waits til transition is finished and then executes the function
		todo.addEventListener("trasitioned", function(){
			todo.remove();
		})

	}

	//clicking on check button
	if(item.classList[0]==='completed-btn'){
		const todo =item.parentElement;
		todo.classList.toggle('completed');
	}
}