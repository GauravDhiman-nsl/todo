'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from 'sonner'
import { useAppDispatch } from '@/hooks/redux'
import { createTodo } from '@/store/todos/thunks'
import { createTodoSchema } from '@/lib/validation'

export default function TodoForm() {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{ title: '', priority: 2 }}
      validationSchema={createTodoSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await dispatch(
            createTodo({
              title: values.title.trim(),
              priority: values.priority as 1|2|3,
            })
          ).unwrap()
          toast.success('Created')
          resetForm()
        } catch {
          toast.error('Failed to create todo')
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex gap-2">
          <div className="flex-1">
            <Field
              name="title"
              placeholder="Add a task..."
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              maxLength={100}
            />
            <div className="mt-1 text-xs text-red-600">
              <ErrorMessage name="title" />
            </div>
          </div>

          <Field
            as="select"
            name="priority"
            className="rounded-md border px-2 py-2 text-sm"
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isSubmitting ? 'Adding…' : 'Add'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
