
export default function GetDifficulty() {
	return ['EASY', 'MEDIUM', 'HARD'].map((value) => ({ label: value, value: value }));
}