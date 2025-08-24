import { Timestamp } from 'firebase/firestore';

export type Todo = {
    id: string
    title: string
    completed: boolean
    priority: 1 | 2| 3
    createdAt: string
}

export type CreateTodoInput = {
    title: string
    priority: 1 | 2 | 3
}

export type UpdateTodoInput = {
    id: string
    title?: string
    priority?: 1 | 2 | 3
    completed?: boolean
}

export type TodoDocumentData = {
  title: string;
  completed: boolean;
  priority: 1 | 2 | 3;
  createdAt: Timestamp;
};