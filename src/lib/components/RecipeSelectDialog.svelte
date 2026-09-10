<script lang="ts">

	import { page    } from '$app/state';
	import { enhance } from '$app/forms';

    import fuzzysort from 'fuzzysort'

	let { date } = $props();
    let recipes = $state(page.data.recipes);
    let index   = $state(0);

    recipes = fuzzysort.go('', page.data.recipes, {key: 'slug', limit: 0})


    function oninput(event) {
        recipes = fuzzysort.go(event.target.value, page.data.recipes, {key: 'slug', limit: 0});
        index = 0;
    }

    function onkeydown(event) {
        const min = 0;
        const max = recipes.length - 1;
        switch(event.key) {
            case "ArrowUp":   index = index > min ? index - 1 : min; event.preventDefault(); break;
            case "ArrowDown": index = index < max ? index + 1 : max; event.preventDefault(); break;
        }
    }

    function onsubmit(event) {
        event.target.closest('dialog').close();
    }

    // Event handler for when the dialog gets closed by a form submission, an
    // escape key press, or a (TODO) click away. When closing the dialog, we
    // clear all state.
    //
    // TODO: checked status (index) doesn't reset when form is submitted
    function onclose(event) {
        event.target.querySelector('input[type="text"]').value = '';
        recipes = fuzzysort.go('', page.data.recipes, {key: 'slug', limit: 0})
        index = 0;
    }

</script>

<dialog id="recipe-select" onclose={onclose}>
    <form method="POST" action="?/add" use:enhance onsubmit={onsubmit}>
        <div>
            <input type="text" oninput={oninput} onkeydown={onkeydown} />
            <input type="hidden" name="date" value="{date}">
            <input type="submit" hidden>

            {#each recipes as r,i}
                <input type="radio" id="{r.obj.slug}" name="recipe" value="{r.obj.slug}" checked={i==index}/>
                <label for="{r.obj.slug}">{r.obj.name || r.obj.slug}</label>
            {/each}
        </div>
    </form>
</dialog>

<style>

    dialog {

        height: 80%;
        width:  80%;

        div {
            display: flex;
            flex-direction: column;
        }

        input {
            appearance: none;
        }

        input[type="radio"]:checked+label{ font-weight: bold; } 

    }
</style>

