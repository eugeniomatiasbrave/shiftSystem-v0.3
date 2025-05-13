<!-- Navbar.svelte - Barra de navegación principal para el sistema de turnos -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Props del componente
  export let user = null;
  export let confirmLogout = null;
  
  // Estado para control del menú móvil
  let isMobileMenuOpen = false;
  
  // Función para alternar el menú móvil
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
  
  // Determina si estamos en modo administrador o usuario
  $: isAdmin = user && user.role === 'admin';
  $: isAuthenticated = !!user;
</script>

<nav class="bg-white shadow dark:bg-gray-800">
  <div class="container px-6 py-3 mx-auto">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- Logo -->
          <a href="/" class="flex items-center">
            <div class="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span class="text-2xl font-bold text-purple-600">Turnero</span>
          </a>
          
          <!-- Menú de navegación para escritorio -->
          <div class="hidden mx-10 md:block">
            <div class="flex items-center space-x-4">
              <a href="/" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/'}>
                Inicio
              </a>
              
              {#if isAuthenticated}
                <!-- Enlaces según el rol del usuario -->
                {#if isAdmin}
                  <!-- Enlaces exclusivos para administradores -->
                  <a href="/dashboard" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/dashboard')}>
                    Dashboard
                  </a>
                  
                  <a href="/users" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/users')}>
                    Pacientes
                  </a>
                  
                  <a href="/adminShifts" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/adminShifts')}>
                    Gestión de Turnos
                  </a>
                {:else}
                  <!-- Enlaces para usuarios normales -->
                  <a href="/shifts" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/shifts') && !$page.url.pathname.includes('/my-appointments')}>
                    Turnos Disponibles
                  </a>
                  
                  <a href="/my-appointments" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/my-appointments')}>
                    Mis Citas
                  </a>
                  
                  <a href="/payments" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/payments')}>
                    Mis Pagos
                  </a>
                  
                  <a href="/profile" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/profile'}>
                    Mi Perfil
                  </a>
                {/if}
              {:else}
                <!-- Enlaces para usuarios no autenticados -->
                <a href="/about" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/about'}>
                  Acerca de
                </a>
                
                <a href="/contact" class="text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/contact'}>
                  Contacto
                </a>
              {/if}
            </div>
          </div>
        </div>
        
        <!-- Botones de autenticación y menú móvil -->
        <div class="flex items-center">
          {#if isAuthenticated}
            <form method="POST" action="/logout" on:submit={confirmLogout}>
              <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                Cerrar Sesión
              </button>
            </form>
          {:else}
            <a href="/login" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors">
              Iniciar Sesión
            </a>
          {/if}
          
          <!-- Botón de menú móvil -->
          <div class="flex md:hidden ml-4">
            <button on:click={toggleMobileMenu} type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
              {#if isMobileMenuOpen}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              {/if}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Menú móvil -->
      {#if isMobileMenuOpen}
        <div class="flex flex-col mt-4 md:hidden">
          <a href="/" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/'}>
            Inicio
          </a>
          
          {#if isAuthenticated}
            <!-- Enlaces según el rol del usuario -->
            {#if isAdmin}
              <!-- Enlaces exclusivos para administradores -->
              <a href="/dashboard" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/dashboard')}>
                Dashboard
              </a>
              
              <a href="/users" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/users')}>
                Pacientes
              </a>
              
              <a href="/adminShifts" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/adminShifts')}>
                Gestión de Turnos
              </a>
            {:else}
              <!-- Enlaces para usuarios normales -->
              <a href="/shifts" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/shifts') && !$page.url.pathname.includes('/my-appointments')}>
                Turnos Disponibles
              </a>
              
              <a href="/my-appointments" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/my-appointments')}>
                Mis Citas
              </a>
              
              <a href="/payments" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname.includes('/payments')}>
                Mis Pagos
              </a>
              
              <a href="/profile" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/profile'}>
                Mi Perfil
              </a>
            {/if}
            
            <div class="pt-2">
              <form method="POST" action="/logout" on:submit={confirmLogout}>
                <button type="submit" class="text-gray-700 dark:text-gray-200 hover:text-red-500 transition">
                  Cerrar Sesión
                </button>
              </form>
            </div>
          {:else}
            <!-- Enlaces para usuarios no autenticados (móvil) -->
            <a href="/about" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/about'}>
               Acerca de
            </a>
            
            <a href="/contact" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/contact'}>
              Contacto
            </a>
            
            <a href="/login" class="py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 transition" class:text-purple-600={$page.url.pathname === '/login'}>
              Iniciar Sesión
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</nav>
