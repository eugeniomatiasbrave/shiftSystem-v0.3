<script>
import BackButton from "$lib/components/BackButton.svelte";
export let data;
const {getShiftsByUser} = data;
console.log(getShiftsByUser.data);

function formatDate(dateString) {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

</script>

<h2 class="my-4 text-4xl font-bold text-center text-white">List My Shifts</h2>
<div class="bg-slate-100 p-2 rounded-md mt-11">
  <BackButton></BackButton>
  <div class="w-full rounded-md shadow-xl card bg-base-50 border mt-3">
   
        <div class="container-table">
            <div class="overflow-x-auto">
			  <form method="POST">
                <table class="table">
                    <thead class="text-center">
                        <tr>
                            
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
							<th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                       
						{#each getShiftsByUser.data as shift}
							<tr>
								<input type="hidden" name="id" value={shift._id}>
								
								<td>{formatDate(shift.date)}</td>
								
								<td>{shift.time}</td>         
								
								<td>{shift.status}</td>
								<td>	
								   <button type="submit" class="btn btn-secondary">Cancel</button>	
								</td>
							</tr>
						{/each}
                    </tbody>
                </table>
			  </form>
            </div>
        </div>
    </div>
</div>
