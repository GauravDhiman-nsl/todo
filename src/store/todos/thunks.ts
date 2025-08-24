import { createAsyncThunk } from '@reduxjs/toolkit'
import { TodosService } from '@/services/todos'
import type { CreateTodoInput, UpdateTodoInput } from '@/lib/types'

export const fetchTodos = createAsyncThunk('todos/fetchAll', async () => {
  const data = await TodosService.list()
  return data
})

export const createTodo = createAsyncThunk('todos/create', async (input: CreateTodoInput) => {
  const todo = await TodosService.create(input)
  return todo
})

export const updateTodo = createAsyncThunk('todos/update', async (input: UpdateTodoInput) => {
  const todo = await TodosService.update(input)
  return todo
})

export const deleteTodo = createAsyncThunk('todos/delete', async (id: string) => {
  await TodosService.delete(id)
  return id
})