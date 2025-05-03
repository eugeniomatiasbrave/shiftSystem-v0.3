<script>
import BackButton from "$lib/components/BackButton.svelte";
export let data;
export let form;
const {getShiftsByUser} = data;
console.log(getShiftsByUser.data);


</script>


<div class="mx-auto bg-white p-5 rounded-lg shadow-md mt-16">
  <BackButton></BackButton>
  <form method="POST" class="mt-3">
      <h2 class="text-3xl font-bold text-center">Mis Turnos</h2>
      
      {#if form?.error}
        <div class="alert alert-error my-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{form.error}</span>
        </div>
      {/if}
      
      {#if form?.success}
        <div class="alert alert-success my-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{form.message}</span>
        </div>
      {/if}
      
      <div class="w-full rounded-md card bg-base-50 border mt-3">
                <table class="table">
                    <thead class="text-center">
                        <tr>   
                            <th>Select</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                       
						{#each getShiftsByUser.data as shift}
							<tr class="hover">
                                <td>
                                    <input type="radio" name="id_shift" value={shift.id_shift} on:change={() => console.log(shift)} />
                                </td>
								<td>{shift.date}</td>
								<td>{shift.time}</td>         
								<td>{shift.status}</td>
							</tr>
						{/each}
                    </tbody>
                </table>
            </div>
                <div class="flex-auto">
                    <div class="mt-3 form-control">
                      <button type="submit" class="btn btn-info">Cancelar Turno</button>
                      <p class="text-xs mt-1 text-gray-500">Los turnos no pueden cancelarse dentro de las 24 horas previas a la cita.</p>
                    </div>
                    <div class="mt-3 form-control">
                      <a href="/shifts" class="btn btn-secondary">Reprogramar</a>
                    </div>
                </div>
			  </form>
</div>
