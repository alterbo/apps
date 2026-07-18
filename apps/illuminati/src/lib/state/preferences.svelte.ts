export type Theme = 'light' | 'dark';

export interface Preferences {
	theme: Theme;
	animations: boolean;
}

export function createPreferences() {
	let theme = $state<Theme>('dark');
	let animations = $state(true);

	return {
		get theme() { return theme; },
		set theme(v: Theme) { theme = v; },
		get animations() { return animations; },
		set animations(v: boolean) { animations = v; },
	};
}

export type PreferencesState = ReturnType<typeof createPreferences>;
