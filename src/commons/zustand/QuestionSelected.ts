import { create } from "zustand";

interface State {
	selected: Map<string, string[]>;
}
interface Action {
	select: ({
		questionId,
		answerId,
	}: {
		questionId: string;
		answerId: string;
	}) => void;
	remove: ({
		questionId,
		answerId,
	}: {
		questionId: string;
		answerId: string;
	}) => void;
	reset: () => void
}

export const SelectAndRemoveAnswer = create<State & Action>((set) => ({
	selected: new Map<string, string[]>(),
	select: ({ questionId, answerId }) =>
		set((state) => {
			const newMap = new Map<string, string[]>(state.selected);
			if (state.selected.has(questionId)) {
				const answerList = state.selected.get(questionId) || [];
				newMap.set(questionId, [...answerList, answerId]);
			} else {
				newMap.set(questionId, [answerId]);
			}
			return { selected: newMap };
		}),
		remove: ({ questionId, answerId, }) => set(state => {
			const newMap = new Map<string, string[]>(state.selected);
			if (state.selected.has(questionId)) {
				const answerList = state.selected.get(questionId) || [];
				const newAnswerList = answerList.filter(answer => answer !== answerId);
				newMap.set(questionId, newAnswerList);
			}
			return {selected: newMap};
		}),
		reset: () => set(() => ({selected: new Map<string, string[]>()})),
}));
