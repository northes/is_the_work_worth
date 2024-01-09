import { writable } from 'svelte/store';

// const titleEmoji = writable('🤔');

// titleEmoji.subscribe((value) => {
// 	console.log(value);
// }); // logs '0'
//
// titleEmoji.set(1); // logs '1'
//
// titleEmoji.update((n) => n + 1); // logs '2'

export const titleEmoji= writable('🤔');