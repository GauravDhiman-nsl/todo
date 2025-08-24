import * as yup from 'yup'

export const createTodoSchema = yup.object({
title: yup.string()
.trim()
.min(1, "Title is required")
.max(100, "Should exceed 100 characters")
.required("Title is required"),
priority: yup.number()
.oneOf([1,2,3], 'Invalid priority')
.required("Priority required"),
})

export const updateTodoSchema = yup.object({
id: yup.string().required(),
title: yup.string().trim().min(1).max(100).optional(),
priority:yup.number().oneOf([1,2,3]).optional(),
completed:yup.boolean().optional(),
})
