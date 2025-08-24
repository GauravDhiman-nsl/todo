import Filters from '@/components/filters/filters'
import TodoForm from '@/components/todo-form/todoform'
import TodoList from '@/components/todo-list/todolist'

export default function TodoHome() {
 
  return (
    <main className="space-y-6">
      <TodoForm />
      <Filters />
      <TodoList />
    </main>
  )
}
