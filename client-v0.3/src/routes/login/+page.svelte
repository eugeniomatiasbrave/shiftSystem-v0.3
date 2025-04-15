<script>
    import { enhance } from "$app/forms";
    //import { goto } from "$app/navigation";
    import BackButton from "$lib/components/BackButton.svelte";
    import Swal from "sweetalert2";

    let status = 0;
    let enhanceResult;
    let password = "";
    let email = "";
    
    $: password !== "" && email !== "";

</script>

<div class="min-h-screen hero">
    <div class="flex-col hero-content lg:flex-row-reverse">
        <div class="flex-shrink-0 w-full max-w-sm shadow-lg card rounded-xl bg-base-100">
            <div class="rounded-lg card-body bg-slate-50">
                <BackButton></BackButton>
                <form
                    method="POST"
                    use:enhance={({ formElement, formData, action, cancel }) => {
                        return async ({ result, update }) => {
                            enhanceResult = result;
                            status = enhanceResult.status;

                            if (result.status === 200) {
                                Swal.fire({
                                    title: 'Bienvenido!',
                                    text: 'Inicio de sesión exitoso',
                                    icon: 'success',
                                    confirmButtonColor: "#0a7399",
                                    confirmButtonText: 'Ok'
                                }).then(() => { window.location.href = "/"; });
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Usuario o contraseña incorrectos',
                                    icon: 'error',
                                    confirmButtonColor: "#0a7399",
                                    confirmButtonText: 'Ok'
                                });
                            }
                        };
                    }}>
                    <h2 class="text-xl font-bold title">Iniciar Sesión</h2>
                    <div class="form-control">
                        <label class="label" for="usuario">
                            <span class="label-text text-slate-950">Email 📩</span>
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            class="input input-bordered"
                            bind:value={email}
                        />
                    </div>
                    <div class="form-control">
                        <label class="label" for="password">
                            <span class="label-text text-slate-950">Password 🔐</span>
                        </label>
                        <input
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            class="input input-bordered"
                            bind:value={password}
                        />
                    </div>
                    <div class="mt-6 form-control">
                        <button class="btn btn-primary" type="submit">Iniciar sesión</button>
                    </div>
                </form>
                <div class="grid grid-cols-1 gap-2">
                    <a class="btn btn-secondary" href="/login/recover">Recuperar contraseña</a>
                    <div class="text-sm divider">¿No posee un usuario?</div>
                    <a class="btn btn-primary btn-outline" href="/register">Nuevo usuario</a>
                </div>
            </div>
        </div>
    </div>
</div>


