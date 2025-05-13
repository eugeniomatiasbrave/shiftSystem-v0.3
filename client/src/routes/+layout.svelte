<script>
	import "../app.css";
	import Swal from 'sweetalert2';
	import Navbar from '$lib/components/common/Navbar.svelte';

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

<Navbar user={data.user} {confirmLogout} />

<div class="container mx-auto">
	<slot />
</div>