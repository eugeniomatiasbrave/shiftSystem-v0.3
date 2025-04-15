<script>
import BackButton from "$lib/components/BackButton.svelte";
export let data;
const {shiftsUser} = data;
console.log(shiftsUser.data);

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
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Date</th>
                            <th>Day Of Week</th>
                            <th>Hour</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Price</th>
							<th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                       
						{#each shiftsUser.data as shift (shift._id)}
							<tr>
								<td>{shift._id}</td>
								<input type="hidden" name="sid" value={shift._id}>
								<td>{shift.userId}</td>
								<td>{formatDate(shift.date)}</td>
								<td>{shift.dayOfWeek}</td>
								<td>{shift.hour}</td>         
								<td>{shift.duration}</td>
								<td>{shift.status}</td>
								<td>{shift.description}</td>
								<td>{shift.price}</td>
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
