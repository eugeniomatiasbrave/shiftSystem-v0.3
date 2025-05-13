import { writable } from 'svelte/store';

// Store for the date selected by the user
export const selectedDate = writable(null);

// Store for the shift ID selected by the user
export const selectedShiftId = writable(null);

// Store for all available shifts
export const availableShifts = writable([]);

// Store to track if shifts are currently loading
export const isLoadingShifts = writable(false);

// Reset all shift-related stores
export function resetShiftStores() {
  selectedDate.set(null);
  selectedShiftId.set(null);
  availableShifts.set([]);
  isLoadingShifts.set(false);
}