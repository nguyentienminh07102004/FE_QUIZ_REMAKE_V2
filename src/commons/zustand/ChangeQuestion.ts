import { create } from "zustand";
interface State {
	questionOrder: number
}
interface Action {
	changeQuestionOrder: (order: number) => void
}
export const ChangeQuestion = create<State & Action>((set) => ({
	questionOrder: 0,
	changeQuestionOrder: (order: number) => set(() => ({questionOrder: order})),
}));