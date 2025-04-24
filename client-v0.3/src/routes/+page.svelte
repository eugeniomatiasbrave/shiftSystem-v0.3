<script>
   export let data;
   export let form;
   console.log(form)
   
</script>


{#if data.user}
	{#if data.user.role === 'admin'}
	<div class="flex items-center justify-center min-h-screen">
		<div class="mx-auto bg-base-200 p-5 rounded-lg shadow-md">
		  <div class="hero-content text-center">
			<div class="max-w-md">
			  <h1 class="text-5xl font-bold">Hello {data.user.firstName}</h1>
			  <p class="py-6">
				Reserva el turno en Wellness para comenzar tu estado de bienestar integral físico, mental y emocionale . 
				Wellness propone tratar de vivir de manera saludable y equilibrada, tomando decisiones que promuevan una mejor calidad de vida. 
				Buscamos englobar hábitos saludables como una buena alimentación, ejercicio regular, manejo del estrés y atención a la salud mental. 
				¡Básicamente, es todo lo que te hace sentir bien! ¿Quieres hablar más sobre cómo incorporar wellness en tu vida?
			  </p>
			  <a href="/adminShifts" class="btn btn-primary">Get to Admin Shift</a>
			</div>
		  </div>
		</div>
	  </div>
	{:else}
	<div class="flex items-center justify-center min-h-screen">
		<div class="mx-auto bg-base-200 p-5 rounded-lg shadow-md">
		  <div class="hero-content text-center">
			<div class="max-w-md">
			  <h1 class="text-5xl font-bold">Hello {data.user.firstName}</h1>
			  <p class="py-6">
				Reserva el turno en Wellness para comenzar tu estado de bienestar integral físico, mental y emocionale . 
				Wellness propone tratar de vivir de manera saludable y equilibrada, tomando decisiones que promuevan una mejor calidad de vida. 
				Buscamos englobar hábitos saludables como una buena alimentación, ejercicio regular, manejo del estrés y atención a la salud mental. 
				¡Básicamente, es todo lo que te hace sentir bien! ¿Quieres hablar más sobre cómo incorporar wellness en tu vida?
			  </p>
			  <a href="/shifts" class="btn btn-primary">Get Started</a>
			</div>
		  </div>
		</div>
	  </div>
{/if}
{:else}
  <h1 class="my-10 text-4xl font-bold text-center text-white"> Welcome to Wellness</h1>
  <h1 class="my-10 text-4xl font-bold text-center text-white"> Please register and log in</h1>
{/if}