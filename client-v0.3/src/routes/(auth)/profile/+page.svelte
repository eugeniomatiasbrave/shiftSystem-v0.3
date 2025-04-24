<script>
    export let data;
    const { user } = data;
    
    
    let id = user.id_user;
    let firstName = user.firstName;
    let lastName = user.lastName;
    let email = user.email;
  
    let errorMessage = '';



    
  </script>
  
  
  <h1 class="my-10 text-4xl font-bold text-center text-white">Welcome to Profile</h1>
  <div class="card shadow-lg bg-white rounded-xl w-full">
    <div class="card-body w-full transition-all duration-300">
      <h2 class="text-2xl font-bold mb-6">Actualización del perfil</h2>
  
      <form method="POST" class="flex flex-col gap-4" action="?/users" >
        <input type="hidden" name="id" value={id} />
        <div class="flex flex-col lg:flex-row items-center lg:items-start">
          <div class="flex-grow w-full">
            <div class="form-control mb-4">
              <label class="label" for="email">
                <span class="label-text">Email 📩</span>
              </label>
              <input
                type="email"
                bind:value={email}
                id="email"
                name="email"
                placeholder="mail@mail.com"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control mb-4">
              <label class="label" for="firstName">
                <span class="label-text">Nombre 👤</span>
              </label>
              <input
                type="text"
                bind:value={firstName}
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label" for="lastName">
                <span class="label-text">Apellido 👤</span>
              </label>
              <input
                type="text"
                bind:value={lastName}
                id="lastName"
                name="lastName"
                placeholder="Apellido"
                class="input input-bordered"
                required
              />
            </div>
            {#if errorMessage}
              <p class="text-error mt-2">{errorMessage}</p>
            {/if}
            <div class="form-control mt-6">
              <button class="btn btn-info w-full" type="submit">Actualizar perfil</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>