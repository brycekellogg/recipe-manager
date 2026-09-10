
<script lang="ts">

	import { enhance } from '$app/forms';
    import IconClose from 'virtual:icons/material-symbols/close'
	const { recipe, date } = $props();

</script>

<div class="recipe">
    <form method="POST" action="?/delete" use:enhance>
        <span>{recipe.name || recipe.slug}</span>
        <input type="hidden" name="recipe" value="{recipe.slug}">
        <input type="hidden" name="date"   value="{date}">
        <button><IconClose /></button>
    </form>
</div>


<style>
    div.recipe {
        border: 1px solid grey;
        border-radius: 14px;
        margin: 2px;
        padding-top:    4px;
        padding-bottom: 4px;
        padding-left:   9px;
        padding-right:  9px;
        white-space: nowrap;
        width: fit-content;
    }
</style>
