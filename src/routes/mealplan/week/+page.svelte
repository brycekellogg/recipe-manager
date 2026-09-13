<script lang="ts">

	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	import { queryParameters } from 'sveltekit-search-params';
    
    import IconAdd   from 'virtual:icons/material-symbols/add'
    import IconClose from 'virtual:icons/material-symbols/close'

    import RecipeSelectDialog from '$lib/components/RecipeSelectDialog.svelte'

    const params = queryParameters();

    let props = $props();
    let data = $derived(props.data);
	let date = $state(null);


</script>

<main>
    {#each data.mealplan as m}
        <a href="/meelplan/day?date={m.iso}" class="cell date">
            <p class="date">{m.weekday}</p>
            <p class="date">{m.day}</p>
        </a>
        <div class="cell meals">
            {#each m.recipes as r}
                <div class="recipe">
                    <a href="recipes/{r.slug}">{r.name || r.slug}</a>
                    <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="recipe" value="{r.slug}">
                        <input type="hidden" name="date"   value="{m.iso}">
                        <button class="delete"><IconClose /></button>
                    </form>
                </div>
            {/each}
            <button class="add" command="show-modal" commandfor="recipe-select" onclick={() => {date=m.iso}}><IconAdd /></button>
        </div>
    {/each}
</main>

<RecipeSelectDialog date={date}/>


<style>


    main {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: max-content 1fr; /* First row fits content */
        grid-auto-rows: 1fr;                    /* All rows same height   */
    }

    a.cell.date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right:  1px solid grey;
        border-bottom: 1px solid grey;
        padding:  6px;
        text-align: center;

        text-decoration: none;
        color: var(--color-fg);

        p {
            margin: 0px;
        }
    }

    div.cell.meals {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        align-content: flex-start;
        border-bottom: 1px solid grey;
        padding: 4px;
    }


    div.recipe {
        display: flex;
        border: 1px solid grey;
        border-radius: 14px;
        margin: 2px;
        padding-top:    0px;
        padding-bottom: 0px;
        padding-left:   6px;
        padding-right:  0px;
        white-space: nowrap;
        width: fit-content;
        

        a {
            font-size: small;
            vertical-align: middle;
            text-decoration: none;
        }
    }

    /* Style add & delete buttons to
       only show the contained icon */
    button.add, button.delete {
        background-color: transparent;
        border: none;
    }

    /* Place the add button in the bottom right of
       its parent using absolute positioning. Note
       that the containing parent must use relative
       positioning for this to work. */
    :has(button.add) {

        position: relative;
        
        button.add {
            position: absolute;
            bottom: 0;
            right:  0;
        }
    }


</style>
