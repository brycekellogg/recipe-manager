<script lang="ts">

	import { page    } from '$app/state';
	import { enhance } from '$app/forms';

    import fuzzysort from 'fuzzysort'

	let { date } = $props();
    let recipes = $state(page.data.recipes);

    recipes = fuzzysort.go('', page.data.recipes, {key: 'slug', limit: 0})

    //
    //
    //
    function oninput(event) {
        recipes = fuzzysort.go(event.target.value, page.data.recipes, {key: 'slug', limit: 0});
    }

    // We prevent default so that the cursor doesn't move on the text input.
    function onkeydown(event) {
        if (event.key == "ArrowUp" || event.key == "ArrowDown") {
            const prev = event.target.form.querySelector('li:has(input:checked)');

            let next = null;
            switch(event.key) {
                case "ArrowUp":   next = prev?.previousElementSibling; break;
                case "ArrowDown": next = prev?.nextElementSibling;     break;
            }

            if (next) next.firstElementChild.control.checked = true;

            event.preventDefault();
        }
    }

    // Event handler for when the mouse enters the dialog
    // or any of its children. If we're hovering over a
    // checkbox label (i.e. a recipe name) we want to set
    // it as selected.
    function onmouseover(event) {
        if (event.target.matches('li')) {
            event.target.firstElementChild.control.checked = true;
        }
    }

    // Event handler for when we click on the dialog
    // or one of its children. If we're clicking on a
    // checkbox label (i.e. a recipe name) we want to
    // submit the form. Form submission needs to be by
    // clicking the submit input or else Svelte won't
    // properly handle the submission.
    function onclick(event) {
        if (event.target.matches('li')) {
            event.target.firstElementChild.form.querySelector('input[type="submit"]').click();
        }
    }


    // dialogs don't close automatically on form submit
    function onsubmit(event) {
        event.target.closest('dialog').close();
    }

    // Event handler for when the dialog gets opened/closed.
    // We clear all state because each instance of the dialog
    // should have the same blank state.
    function ontoggle(event) {
        event.target.querySelector('input[type="text"]').value = '';
        event.target.querySelector('li:first-child input').checked = true;
        recipes = fuzzysort.go('', page.data.recipes, {key: 'slug', limit: 0})
    }

</script>

<dialog id="recipe-select" ontoggle={ontoggle} onmouseover={onmouseover} onclick={onclick} closedby="any">
    <form method="POST" action="?/add" use:enhance onsubmit={onsubmit}>
        <input type="text" oninput={oninput} onkeydown={onkeydown} />
        <input type="hidden" name="date" value="{date}">
        <input type="submit" hidden>
        <ul>
            {#each recipes as r,i}
                <li><label>{r.obj.name || r.obj.slug}
                    <input type="radio" name="recipe" value="{r.obj.slug}" checked={i==0}/>
                </label></li>
            {/each}
        </ul>
    </form>
</dialog>

<style>

    dialog {
        height: 80%;
        width:  80%;
        padding: 0;
        border: 1px solid var(--color-bg-secondary);
    }

    /* Layout the form top-to-bottom and make the
       height 100% so that the child ul scrolls
       instead of the dialog or the form itself. */
    form {
        height: 100%;
        display: flex;
        flex-direction: column;
    }


    ul {
        overflow: scroll;
        padding: 0;
        margin: 0;
        list-style-type: none;
        color: var(--color-fg);
    }
        
    /* Provide space in between list elements */
    li {
        padding: 6px 16px;
    }
    
    li:has(input[type="radio"]:checked) { 
        background-color: var(--color-bg-secondary);
    }

    /* We don't want to see the radio buttons
       or have them affect layout at all. */
    input[type="radio"] { 
        appearance: none;
        margin: 0;
    }

    input[type="text"] {
        outline: none;  /* Removed extra border when focused */
        border: none;
        padding: 8px 8px;
    }

</style>

