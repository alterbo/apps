import { writable } from 'svelte/store'

export const animations = writable(true)

export const genreState = $state({
	genre: 'male',
	active: 1,
})