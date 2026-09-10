<script lang="ts">
	import { page } from '$app/state';

    const recipes = page.data.recipes;

</script>

<h1>Recipes</h1>
<ul>
	{#each recipes as r}
    <li><a href="recipes/{r.slug}">{r.title}</a></li>
	{/each}
</ul>

