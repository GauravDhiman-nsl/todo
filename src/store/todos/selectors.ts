import { createSelector } from "reselect";
import type { RootState } from "@/store";
import type { Todo } from "@/lib/types";

// 1. Input selectors
const selectTodosById = (state: RootState) => state.todos.byId;
const selectAllTodoIds = (state: RootState) => state.todos.allIds;

// 2. Memoized selector for todos array
export const selectTodosArray = createSelector(
  [selectTodosById, selectAllTodoIds],
  (byId: Record<string, Todo>, allIds: string[]): Todo[] =>
    allIds.map((id) => byId[id])
);

// 3. Simple selectors
export const selectLoading = (s: RootState) => s.todos.loading;
export const selectError = (s: RootState) => s.todos.error;
