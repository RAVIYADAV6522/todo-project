let task = document.getElementById("input-data");
let btn = document.getElementById("btn");
let list = document.getElementById("todo-list");

let todoArray = [];

let localstorage = localStorage.getItem("TodoArray");

if (localstorage !== null) {
  let data = JSON.parse(localstorage);
  todoArray = data;
  console.log(data)
  elementDikhao();
}

btn.addEventListener("click", function () {
  if (task.value === "") {
    alert("Enter something");
    return new Error("pls add something");
  }
  let todo = {
    id: Date.now(),
    todoText: task.value,
  };
  todoArray.push(todo);
  console.log(todoArray);
  localStorage.setItem("TodoArray", JSON.stringify(todoArray));

  task.value = "";
  elementDikhao();
});

function elementDikhao() {
  list.innerHTML = "";
  for (let i = 0; i < todoArray.length; i++) {
    let { id, todoText } = todoArray[i];
    let element = document.createElement("div");
    element.innerHTML = `<span contenteditable="False" class="task">${todoText}</span><button class="edit">Edit</button><button class="delete">Delete</button>`;

    // select buttons --------------
    let editBtn = element.querySelector(".edit");
    let delBtn = element.querySelector(".delete");
    let spanEle = element.querySelector(".task");

    // delete feature -----------------------------------------------------------------------------------
    delBtn.addEventListener("click", () => {
      const newList = todoArray.filter((ele, idx) => {
        return ele.id != id;
      });
      todoArray = newList;
      list.removeChild(element);
      console.log(todoArray);
      localStorage.setItem("TodoArray", JSON.stringify(todoArray));
    });

    // edit feature --------------------------------------------------------------------------------------
    editBtn.addEventListener("click", () => {
      if (editBtn.innerText === "Edit") {
        console.log("edit");
        spanEle.setAttribute("contenteditable", "true");
        editBtn.innerText = "Save";
      } else {
        console.log("this is array : ", todoArray);
        let updatedTodo = spanEle.innerText;
        let newList = todoArray.map((ele, idx) => {
          if (ele.id === id) {
            ele.todoText = updatedTodo;
            return ele;
          }
          return ele;
        });
        console.log("this is array : ", newList);
        todoArray = newList;
        console.log(todoArray);
        spanEle.setAttribute("contenteditable", "false");

        localStorage.setItem("TodoArray", JSON.stringify(todoArray));
      }
    });

    list.appendChild(element);
  }
}
