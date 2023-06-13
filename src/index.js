import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD = "ADD";
const DEL = "DEL";

const modifyToDoList = (toDoList = [], action) => {
  switch(action.type) {
    case ADD:
      return [...toDoList, { toDo: action.toDo, id: Date.now() }];
    case DEL:
      return toDoList.filter(toDo => toDo.id !== action.id);
    default:
      return toDoList;
  }
}

const toDoListStore = createStore(modifyToDoList)

const onChange = () => {
  const toDos = toDoListStore.getState();
  ul.innerHTML = "";
  toDos.forEach(toDosElement => {
    const li = document.createElement("li");
    const del_btn = document.createElement("button");
    del_btn.innerText = "삭제";
    li.id = toDosElement.id;
    li.innerText = toDosElement.toDo;
    del_btn.addEventListener("click", deleteToDo);
    li.appendChild(del_btn);
    ul.appendChild(li);
  });
}

const deleteToDo = e => {
  const toDoId = e.target.parentNode.id;
  toDoListStore.dispatch({ type: DEL, id: parseInt(toDoId) });
}

toDoListStore.subscribe(onChange);

const addList = e => {
  e.preventDefault();
  const toDo = input.value;
  toDoListStore.dispatch({ type: ADD, toDo: toDo });
  input.value = "";
}

form.addEventListener("submit", addList);