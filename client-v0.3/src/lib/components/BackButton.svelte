<script>
  // Función para retroceder en la historia del navegador
  export function navigateBack() {
      window.history.back();
  }
</script>

<button  class="flex items-center justify-center w-20 rounded-full bg-secondary" on:click={navigateBack}>
  <!-- Icono de flecha hacia atrás -->
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#000000">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
  </svg>
  <span>Atrás</span>
</button>

