import { Todo } from "@/lib/types";

export type TodosState = {
byId : Record<string, Todo>
allIds: string[]
loading: boolean
error: string | null
}