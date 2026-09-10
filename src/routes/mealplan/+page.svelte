<script lang="ts">

	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	import { queryParameters } from 'sveltekit-search-params';
    
    import IconAdd   from 'virtual:icons/material-symbols/add'
    import IconClose from 'virtual:icons/material-symbols/close'

    import RecipeSelectDialog from '$lib/components/RecipeSelectDialog.svelte'

    const params = queryParameters();

    // Validate the `view` query param. If it doesn't have
    // one of the allowed values, fallback to a `week` view.
    switch (params.view) {
        case 'day':
        case 'week':
        case 'month':
        case 'schedule':
            break // valid values
        default:
            params.view = 'week';
            break;
    }

    // TODO: Validate the `date` query param.

    let props = $props();
    let data = $derived(props.data);
	let date = $state(null);


</script>

<!-- Day View -->
{#if params.view == 'day'}
    <div class="grid">
        DAY
    </div>
{/if}


<!-- Week View -->
{#if params.view == 'week'}
    <div class="grid">
        {#each data.mealplan as m}
            <div class="cell date">
                <div onclick={() => {
                        params.view = 'day';
                    }}>
                    <p class="date">{m.weekday}</p>
                    <p class="date">{m.day}</p>
                </div>
                <button class="add" command="show-modal" commandfor="recipe-select" onclick={() => {date=m.iso}}><IconAdd /></button>
            </div>
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
            </div>
        {/each}
    </div>
{/if}

<RecipeSelectDialog date={date}/>


<style>


    div.grid {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: max-content 1fr; /* First row fits content */
        grid-auto-rows: 1fr;                    /* All rows same height   */
    }

    div.cell.date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-right:  1px solid grey;
        border-bottom: 1px solid grey;
        padding:  6px;
        text-align: center;

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
        }
    }

    button.add {
        border: 1px solid grey;
        border-radius: 50%;
        border: none;
        margin-top: auto;
        background-color: transparent;
    }

    button.delete {
        background-color: transparent;
        border: none;
    }

</style>
