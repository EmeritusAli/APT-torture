import { writable } from 'svelte/store';

// Create a shared store for the indicator with a default value

export const selectedIndicatorStore = writable("Ratification of the UN Convention against Torture");