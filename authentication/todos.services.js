import Todo from "./db/models/Todos.js"

/**
 * Create and save a new Todo list and return it
 * @param name {String}
 * @param items {Array}
 * @return {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
export async function createTodo(name, items = []) {
    const todo = await Todo.create({
        name, items
    })
    return todo
}