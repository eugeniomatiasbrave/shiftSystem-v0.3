<script>
	import "../app.css";
	import Swal from 'sweetalert2';

	export let data;

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


<nav class="navbar bg-base-100 border-b">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-2xl text-info font-bold">Wellness</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal">
       
      {#if data.user}
     
        {#if data.user.role === 'admin'}
		   
				      <li>
					     <a href="/users" class="btn-ghost text-info font-bold">Patients</a>
				       </li>
               <li>
                <a href="/adminShifts" class="btn-ghost text-info font-bold">AdminShifts</a>
                </li>
                  <li> 
                    <a href="/dashboard" class="btn-ghost text-info font-bold">Dashboard</a>
                  </li>
                  <form method="POST" action="/logout" class="btn btn-ghost text-info font-bold" on:submit={confirmLogout}>
                    <button type='submit'>Logout</button>
                  </form>
        {:else}
                  <li>
                    <a href="/shifts" class="btn btn-ghost text-info font-bold">Shift</a>
                  </li>
                  <li>
                    <a href="/shifts/myShifts" class="btn btn-ghost text-info font-bold">My Shifts</a>
                  </li>
                  <li> 
                    <a href="/profile" class=" btn btn-ghost text-info font-bold">Profile</a>
                  </li>
                  <form method="POST" action="/logout" class="btn btn-ghost text-info font-bold" on:submit={confirmLogout}>
                    <button type='submit'>Logout</button>
                  </form>
        {/if}
      {:else}
        <li><a href="/info" class="btn btn-ghost text-info font-bold">Info</a></li>
        <li><a href="/contact" class="btn btn-ghost text-info font-bold">Contact</a></li>
        <li><a href="/login" class="btn btn-ghost text-info font-bold">Login</a></li>
      {/if}
      </ul>
    </div>
</nav>

<div class="container mx-auto">
	<slot />
</div>