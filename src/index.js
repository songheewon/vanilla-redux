import {createStore} from "redux";

const plus = document.getElementById("add-btn");
const minus = document.getElementById("minus-btn");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  if(action.type === "ADD") {
    return count + 1;
  }
  else if(action.type === "MINUS") {
    return count - 1;
  }
  return count;
};

const countStore = createStore(countModifier);

const onChange = () => {
  console.log("there was a change on the store!")
}
countStore.subscribe(onChange);


const handleAdd = () => {
  countStore.dispatch({type: "ADD"});
}

const handleMinus = () => {
  countStore.dispatch({type: "MINUS"});
}

plus.addEventListener("click", () => handleAdd);
minus.addEventListener("click", () => handleMinus);