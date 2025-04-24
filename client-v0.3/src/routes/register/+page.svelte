<script>
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Swal from "sweetalert2";
	import BackButton from "$lib/components/BackButton.svelte";

	export let form;

	//*Variables para manipular la respuesta del form
	$: status = 0;
	let enhanceResult;
	let password = "";
	let confirmPassword = "";
	let passwordMatch = true;
	let firstName = "";
    let lastName = "";
	let email = "";
	let hasNumberInFirstName = false;
    let hasNumberInLastName = false;
	let isFormValid = false;

	//Con estas validaciones controlo que el formulario no se envie si no esta completo
	 // Actualizamos las validaciones para incluir firstName y lastName
	 $: {
        if (password && confirmPassword) {
            passwordMatch = password === confirmPassword;
        }
        hasNumberInFirstName = /\d/.test(firstName);
        hasNumberInLastName = /\d/.test(lastName);
        isFormValid =
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            passwordMatch === true &&
            !hasNumberInFirstName &&
            !hasNumberInLastName;
    }
	  
</script>

<div class="min-h-screen hero">
	<div class="flex-col hero-content lg:flex-row-reverse">
		<div class="flex-shrink-0 w-full max-w-sm shadow-lg card rounded-xl bg-base-100">
			<div class="card-body">
				<BackButton></BackButton>
				<h2 class="text-xl font-bold">Registro, Nuevo Usuario</h2>
				<form
					method="POST"
					action="?/register"
					use:enhance={({ formElement, formData, action, cancel }) => {
						return async ({ result, update }) => {
							// Le asigno el resultado  de la request a enhanceResult para poder utilizarlo en la vista
							$: enhanceResult = result;
							//*Guardo el valor de status en esta variable para luego arrojar cartel de error de ser necesario.
							$: status = enhanceResult.status;
							Swal.fire({
								title: "¡Guardado con éxito!",
								text: "El registro fue creado con éxito",
								icon: "success",
								confirmButtonColor: "#0a7399",
								confirmButtonText: "Aceptar",
							}).then((result) => {
								if (result.isConfirmed) {
									goto("/");
								}
							});
						};
					}}
				>
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email 📩</span>
						</label>
						<input
							bind:value={email}
							type="email"
							id="email"
							name="email"
							placeholder="Email@mail.com"
							class="input input-bordered"
							required
						/>
						{#if form?.missing}
							<p class="error">Este campo es obligatorio</p>
						{/if}
					</div>
					<div class="form-control"> <!--firstName-->
						<label class="label" for="firstName">
							<span class="label-text">Nombre 👤</span>
						</label>
						<input
							bind:value={firstName}
							type="text"
							id="firstName"
							name="firstName"
							placeholder="Nombre"
							class="input input-bordered"
							required
						/>
						{#if form?.missing}
							<p class="text-xs text-error">Este campo es obligatorio</p>
						{/if}
						{#if hasNumberInFirstName}
							<p class="text-xs text-error">El nombre no debe contener números</p>
						{/if}
					</div>
					<div class="form-control"> <!--lastName-->
						<label class="label" for="lastName">
							<span class="label-text">Apellido 👤</span>
						</label>
						<input
							bind:value={lastName}
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Apellido"
							class="input input-bordered"
							required
						/>
						{#if form?.missing}
							<p class="text-xs text-error">Este campo es obligatorio</p>
						{/if}
						{#if hasNumberInLastName}
							<p class="text-xs text-error">El apellido no debe contener números</p>
						{/if}
					</div>
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password 🔐</span>
						</label>
						<input
							bind:value={password}
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							class="input input-bordered"
							required
						/>
					</div>
					<div class="form-control">
						<label class="label" for="passwordConfirm">
							<span class="label-text">Confirmar Password 🔐</span>
						</label>
						<input
							bind:value={confirmPassword}
							type="password"
							id="passwordConfirm"
							name="passwordConfirm"
							placeholder="Confirmar Password"
							class="input input-bordered"
							required
						/>
						{#if password && confirmPassword && !passwordMatch}
							<p class="mt-2 text-xs text-error">
								Las contraseñas no coinciden, por favor revise el texto ingresado.
							</p>
						{/if}
					</div>
					<div class="mt-6 form-control">
						<button class="btn btn-info" disabled={!isFormValid} type="submit"
							>Crear Usuario</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


