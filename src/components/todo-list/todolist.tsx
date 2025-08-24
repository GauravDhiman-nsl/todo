'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchTodos, deleteTodo, updateTodo } from '@/store/todos/thunks'
import { selectTodosArray, selectLoading, selectError } from '@/store/todos/selectors'
import TodoItem from '../todoitem.tsx/todoitem'
import EmptyState from '../empty-state/empty-state'


export default function TodoList() {
  const sp = useSearchParams()
  const q = sp.get('q')?.trim().toLowerCase() ?? ''
  const status = sp.get('status') ?? 'all'
  const priority = sp.get('priority') ?? 'all'

  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodosArray)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)


  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  const filtered = useMemo(() => {
    let list = todos
    if (q) list = list.filter(t => t.title.toLowerCase().includes(q))
    if (status !== 'all') list = list.filter(t => t.completed === (status === 'done'))
    if (priority !== 'all') list = list.filter(t => String(t.priority) === priority)
    return list
  }, [todos, q, status, priority])

  if (loading) return <p className="text-sm text-gray-500">Loading todos…</p>
  if (error) return <p className="text-sm text-red-600">{error}</p>
  if (!filtered.length) return <EmptyState />

  return (
    <ul className="divide-y rounded-md border">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={(completed) => dispatch(updateTodo({ id: todo.id, completed }))}
          onDelete={() => dispatch(deleteTodo(todo.id))}
          onEdit={(patch) => dispatch(updateTodo({ id: todo.id, ...patch }))}
        />
      ))}
    </ul>
  )
}
