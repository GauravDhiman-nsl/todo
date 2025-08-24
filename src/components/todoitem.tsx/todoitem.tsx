'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Formik, Form, Field } from 'formik'
import type { Todo } from '@/lib/types'
import { PRIORITY_LABELS } from '@/lib/constants'

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}:Readonly< {
  todo: Todo
  onToggle: (completed: boolean) => void
  onDelete: () => void
  onEdit: (patch: { title?: string; priority?: 1|2|3 }) => void
}>) {
  const [editing, setEditing] = useState(false)

  return (
    <li className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(e.target.checked)}
        className="size-4 accent-black"
        aria-label="Toggle completed"
      />

      <div className="flex-1">
        {editing ? (
          <Formik
            initialValues={{ title: todo.title, priority: todo.priority }}
            onSubmit={async (values) => {
             onEdit({ title: values.title.trim(), priority: values.priority, })
              setEditing(false)
            }}
          >
            {() => (
              <Form className="flex items-center gap-2">
                <Field
                  name="title"
                  className="flex-1 rounded-md border px-2 py-1 text-sm"
                  maxLength={100}
                />
                <Field
                  as="select"
                  name="priority"
                  className="rounded-md border px-2 py-1 text-sm"
                >
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </Field>
                <button type="submit" className="rounded-md bg-black px-2 py-1 text-xs text-white">
                  Save
                </button>
                <button type="button" onClick={() => setEditing(false)} className="rounded-md border px-2 py-1 text-xs">
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'text-sm',
                todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
              )}
            >
              {todo.title}
            </span>
            <span
              className={clsx(
                'inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium',
                todo.priority === 1 && 'border-red-200 bg-red-50 text-red-700',
                todo.priority === 2 && 'border-amber-200 bg-amber-50 text-amber-700',
                todo.priority === 3 && 'border-emerald-200 bg-emerald-50 text-emerald-700'
              )}
            >
              {PRIORITY_LABELS[todo.priority] ?? 'Unknown'}
            </span>
          </div>
        )}
      </div>

      {!editing ? (
        <div className="flex items-center gap-2">
          <button onClick={() => setEditing(true)} className="rounded-md border px-2 py-1 text-xs">
            Edit
          </button>
          <button onClick={onDelete} className="rounded-md border px-2 py-1 text-xs">
            Delete
          </button>
        </div>
      ) : null}
    </li>
  )
}
