import { writable } from 'svelte/store';

// Store para gestionar el estado de las reservas de turnos
export const reservationStatus = writable({
  isProcessing: false,
  isSuccessful: false,
  error: null,
  shiftData: null,
  redirectUrl: null
});

// Acciones para actualizar el estado de la reserva
export const startReservationProcess = () => {
  reservationStatus.update(state => ({
    ...state,
    isProcessing: true,
    isSuccessful: false,
    error: null
  }));
};

export const setReservationSuccess = (shiftData) => {
  reservationStatus.update(state => ({
    ...state,
    isProcessing: false,
    isSuccessful: true,
    error: null,
    shiftData,
    redirectUrl: shiftData ? `/shifts/${shiftData.id_shift}/payment` : null
  }));
};

export const setReservationFailure = (error) => {
  reservationStatus.update(state => ({
    ...state,
    isProcessing: false,
    isSuccessful: false,
    error,
    redirectUrl: null
  }));
};

export const resetReservationState = () => {
  reservationStatus.set({
    isProcessing: false,
    isSuccessful: false,
    error: null,
    shiftData: null,
    redirectUrl: null
  });
};
