<script>
import BackButton from "$lib/components/BackButton.svelte";
export let data;
const {getShiftsByUser} = data;
console.log(getShiftsByUser.data);


</script>


<div class="mx-auto bg-white p-5 rounded-lg shadow-md mt-16">
  <BackButton></BackButton>
  <form method="POST" class="mt-3">
      <h2 class="text-3xl font-bold text-center">Mis Turnos</h2>
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
                    </div>
                    <div class="mt-3 form-control">
                      <a href="/shifts/myShifts" class="btn btn-secondary">Reprogramar</a>
                    </div>
                </div>
			  </form>
</div>
