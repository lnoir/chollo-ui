import { writable, type Writable } from 'svelte/store';

const defaultHost = 'http://127.0.0.1:38440';

export const cholloHost: Writable<string> = writable(defaultHost);
