import { createSelector } from "reselect";
import type { RootState } from "@/store";
import type { Todo } from "@/lib/types";


const selectTodosById = (state: RootState) => state.todos.byId;
const selectAllTodoIds = (state: RootState) => state.todos.allIds;

export const selectTodosArray = createSelector(
  [selectTodosById, selectAllTodoIds],
  (byId: Record<string, Todo>, allIds: string[]): Todo[] =>
    allIds.map((id) => byId[id])
);

export const selectLoading = (s: RootState) => s.todos.loading;
export const selectError = (s: RootState) => s.todos.error;
