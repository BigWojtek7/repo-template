import { loadObject, saveObject, deleteObject, addTodo } from "./save-object";
import ToDo from "./todo-class";

import "./style.css";

function displayHandler() {
  const dialog = document.getElementById("add-item");
  const form = document.getElementById("get-item");

  const addButton = document.getElementById("add-button");
  const closeButton = document.getElementById("close-button");

  const divContent = document.querySelector(".content");

  const updateDisplay = () => {
    const todoArray = loadObject().getArray();

    divContent.textContent = "";
    if (todoArray[0] === undefined) return;

    let newDivProject = document.createElement("div");
    newDivProject.dataset.project = todoArray[0].project;
    newDivProject.innerHTML = `<p class="title">${todoArray[0].project}</p> <button>&bull;&bull;&bull;</button>`;

    todoArray.forEach((el, index) => {
      const newDiv = document.createElement("div");

      newDiv.innerHTML = `${el.title} &bull; ${el.description} &bull; ${el.dueDate} 
      <button data-index=${index}>-</button> <button data-expand=${index}>Edit</button>`;
      if (el.priority === "High") {
        newDiv.style.background =
          "linear-gradient( to left, #ef4444 1%, white 50%)";
      } else {
        newDiv.style.background =
          "linear-gradient( to left, #22c55e 1%, white 50%)";
      }

      if (newDivProject.dataset.project === el.project) {
        newDivProject.appendChild(newDiv);
      } else {
        divContent.appendChild(newDivProject);
        newDivProject = document.createElement("div");
        newDivProject.innerHTML = `<p class="title">${el.project}</p> <button>&bull;&bull;&bull;</button>`;
        newDivProject.dataset.project = el.project;
        newDivProject.appendChild(newDiv);
      }
    });
    divContent.appendChild(newDivProject);
  };

  updateDisplay();

  function clickHandler(e) {
    const datasetButton = e.target.dataset.index;
    const datasetDiv = e.target.closest("div").dataset.project;

    const expandButton = e.target.dataset.expand;

    const dialogExpand = document.getElementById("dialog-expand");

    if (datasetButton) {
      deleteObject(datasetButton);
      updateDisplay();
    } else if (expandButton) {
      const todoArray = loadObject().getArray();

      const changeProjectDialog = document.getElementById(
        "change-project-dialog",
      );
      const changeProjectForm = document.getElementById("change-project-form");
      const closeProjectButton = document.getElementById(
        "close-project-button",
      );
      changeProjectDialog.showModal();
      changeProjectForm.addEventListener("submit", () => {
        const changeProjectInput = document.getElementById(
          "change-project-input",
        );

        if (changeProjectInput.value)
          todoArray[expandButton].project = changeProjectInput.value;
        todoArray[expandButton].priority = document.querySelector(
          'input[name="priority-change"]:checked',
        ).value;
        todoArray[expandButton].isDone = document.querySelector(
          'input[name="is-done-change"]:checked',
        ).value;

        saveObject(todoArray);
        updateDisplay();
        changeProjectDialog.close();
        form.reset();
      });

      closeProjectButton.addEventListener("click", () =>
        changeProjectDialog.close(),
      );
    } else if (datasetDiv) {
      const todoArray = loadObject().getArray();
      dialogExpand.innerHTML = "";
      const projectArray = todoArray.filter(
        (item) => datasetDiv === item.project,
      );

      const newTitleDiv = document.createElement("div");
      newTitleDiv.classList.add("title-expand");
      newTitleDiv.innerHTML = `<p class="title-expand">${projectArray[0].project}<p>
      <ol class="description"><li>Title</li><li>Description</li><li>DueDate</li><li>Priority</li><li>isDone</li>`;
      dialogExpand.appendChild(newTitleDiv);
      projectArray.forEach((el) => {
        const newDiv = document.createElement("div");
        if (el.priority === "High") {
          newDiv.style.background =
            "linear-gradient( to left, #ef4444 1%, #f5f5f4 50%)";
        } else {
          newDiv.style.background =
            "linear-gradient( to left, #22c55e 1%, #f5f5f4 50%)";
        }
        newDiv.innerHTML = `<ol><li>${el.title}</li><li>${el.description}</li>
        <li>${el.dueDate}</li><li>${el.priority}</li><li>${el.isDone}</li></ol>`;
        dialogExpand.appendChild(newDiv);
        dialogExpand.showModal();
      });
      const closeExpandButton = document.createElement("button");
      closeExpandButton.innerHTML = "Close";
      dialogExpand.appendChild(closeExpandButton);
      closeExpandButton.addEventListener("click", () => dialogExpand.close());
    }
  }

  divContent.addEventListener("click", clickHandler);

  addButton.addEventListener("click", () => {
    dialog.showModal();
  });
  closeButton.addEventListener("click", () => dialog.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let project = document.getElementById("project").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value.replace("T", " ");
    const priority = document.querySelector(
      'input[name="priority"]:checked',
    ).value;
    const isDone = document.querySelector(
      'input[name="is-done"]:checked',
    ).value;

    if (!project) project = undefined;

    const todo = new ToDo(
      project,
      title,
      description,
      dueDate,
      priority,
      isDone,
    );
    addTodo(todo);
    form.reset();
    dialog.close();
    updateDisplay();
  });
}

displayHandler();

export default displayHandler;
