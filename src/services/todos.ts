import { db } from '@/lib/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  DocumentData,
  QueryDocumentSnapshot, 
} from 'firebase/firestore'
import type { CreateTodoInput, Todo, UpdateTodoInput, TodoDocumentData } from '@/lib/types'

const TODOS = 'todos' 


function toTodo(d: QueryDocumentSnapshot<DocumentData>): Todo {

  const data = d.data() as TodoDocumentData;
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : '';

  return {
    id: d.id,
    title: data.title,
    completed: data.completed,
    priority: data.priority,
    createdAt,
  };
}

export const TodosService = {
  async list(): Promise<Todo[]> {
    const qRef = query(collection(db, TODOS), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(qRef);
    const arr: Todo[] = snapshot.docs.map(toTodo);

    arr.sort((a, b) =>
      Number(a.completed) - Number(b.completed) ||
      a.priority - b.priority ||
      (a.createdAt > b.createdAt ? -1 : 1)
    );

    return arr;
  },


  async create(input: CreateTodoInput): Promise<Todo> {
    const ref = await addDoc(collection(db, TODOS), {
      title: input.title,
      priority: input.priority,
      completed: false,
      createdAt: serverTimestamp(),
    });

  
    return {
      id: ref.id,
      title: input.title,
      completed: false,
      priority: input.priority,
      createdAt: new Date().toISOString(),
    };
  },


  async update({ id, ...patch }: UpdateTodoInput): Promise<Todo> {
    const ref = doc(db, TODOS, id);
    
    await updateDoc(ref, { ...patch });
    return {
      id,
      title: patch.title ?? '', 
      completed: patch.completed ?? false,
      priority: patch.priority ?? 2,
      createdAt: new Date().toISOString(),
    };
  },
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, TODOS, id));
  },
};
