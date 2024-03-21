class ToDo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    isDone,
    project = "default",
  ) {
    this.project = project;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }

  changeProject(newProject) {
    this.project = newProject;
  }
}

export default ToDo
