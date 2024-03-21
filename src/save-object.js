function saveObject(todoArray) {
  localStorage.clear();
  todoArray.forEach((todo, index) => {
    localStorage.setItem(`${index}`, JSON.stringify(todo));
  });
}

function loadObject() {
  const todoArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const toDoObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
    todoArray.push(toDoObject);
  }

  todoArray.sort(
    (a, b) =>
      a.project.localeCompare(b.project) ||
      new Date(a.dueDate) - new Date(b.dueDate),
  );
  const getArray = () => todoArray;
  return { getArray };
}

function deleteObject(index) {
  const todoArray = loadObject().getArray();
  todoArray.splice(index, 1);
  saveObject(todoArray);
}

function addTodo(todo) {
  const todoArray = loadObject().getArray();
  todoArray.push(todo);
  saveObject(todoArray);
}

export { saveObject, loadObject, deleteObject, addTodo };
