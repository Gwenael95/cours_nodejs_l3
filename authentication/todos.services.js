import Todo from "./db/models/Todos.js"

export async function createTodo(name, items = []) {
    const todo = await Todo.create({
        name, items
    })
    return todo
}