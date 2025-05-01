<script>
	import "../app.css";
	import Swal from 'sweetalert2';

	export let data;

  let isOpen = false;
  
  function toggleMenu() {
    isOpen = !isOpen;
  }

	const confirmLogout = (event) => {
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#542169',
            cancelButtonColor: '#f6d860',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: '<span style="color: black;">Cancelar</span>'
        }).then((result) => {
            if (result.isConfirmed) {
                (event.target).submit();
            }
        });
    };

</script>

<header class="bg-white py-4 px-6 md:px-12 shadow-sm">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <div class="flex items-center">
      <a href="/" class="flex items-center">
        <div class="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <span class="text-2xl font-bold text-gray-800">Turnero</span>
      </a>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-8">
      <a href="/" class="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
      {#if data.user}
        {#if data.user.role === 'admin'}
          <a href="/users" class="text-gray-700 hover:text-purple-600 transition-colors">Patients</a>
          <a href="/adminShifts" class="text-gray-700 hover:text-purple-600 transition-colors">AdminShifts</a>
          <a href="/dashboard" class="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</a>
          <form method="POST" action="/logout" on:submit={confirmLogout}>
            <button type="submit" class="text-gray-700 hover:text-purple-600 transition-colors">Logout</button>
          </form>
        {:else}
          <a href="/shifts" class="text-gray-700 hover:text-purple-600 transition-colors">Shift</a>
          <a href="/shifts/myShifts" class="text-gray-700 hover:text-purple-600 transition-colors">My Shifts</a>
          <a href="/profile" class="text-gray-700 hover:text-purple-600 transition-colors">Profile</a>
          <form method="POST" action="/logout" on:submit={confirmLogout}>
            <button type="submit" class="text-gray-700 hover:text-purple-600 transition-colors">Logout</button>
          </form>
        {/if}
      {:else}
        <a href="/info" class="text-gray-700 hover:text-purple-600 transition-colors">Info</a>
        <a href="/contact" class="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
      {/if}
    </nav>

    <div class="hidden md:flex items-center space-x-4">
      {#if data.user}
        <form method="POST" action="/logout" on:submit={confirmLogout}>
          <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
            Logout
          </button>
        </form>
      {:else}
        <a href="/login" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
          Log in
        </a>
      {/if}
    </div>

    <!-- Mobile menu button -->
    <button class="md:hidden text-gray-700" on:click={toggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if isOpen}
    <div class="md:hidden mt-4 pt-4 border-t border-gray-200">
      <nav class="flex flex-col space-y-4 px-2">
        <a href="/" class="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
        {#if data.user}
          {#if data.user.role === 'admin'}
            <a href="/users" class="text-gray-700 hover:text-purple-600 transition-colors">Patients</a>
            <a href="/adminShifts" class="text-gray-700 hover:text-purple-600 transition-colors">AdminShifts</a>
            <a href="/dashboard" class="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</a>
            <form method="POST" action="/logout" on:submit={confirmLogout}>
              <button type="submit" class="text-gray-700 hover:text-purple-600 transition-colors">Logout</button>
            </form>
          {:else}
            <a href="/shifts" class="text-gray-700 hover:text-purple-600 transition-colors">Shift</a>
            <a href="/shifts/myShifts" class="text-gray-700 hover:text-purple-600 transition-colors">My Shifts</a>
            <a href="/profile" class="text-gray-700 hover:text-purple-600 transition-colors">Profile</a>
            <form method="POST" action="/logout" on:submit={confirmLogout}>
              <button type="submit" class="text-gray-700 hover:text-purple-600 transition-colors">Logout</button>
            </form>
          {/if}
        {:else}
          <a href="/info" class="text-gray-700 hover:text-purple-600 transition-colors">Info</a>
          <a href="/contact" class="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
          <a href="/login" class="text-gray-700 hover:text-purple-600 transition-colors">Login</a>
        {/if}
      </nav>
    </div>
  {/if}
</header>

<div class="container mx-auto">
	<slot />
</div>