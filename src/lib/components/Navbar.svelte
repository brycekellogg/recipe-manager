<script lang="ts">

	import { page } from '$app/state';
	import { beforeNavigate } from "$app/navigation";

    import IconMenu   from 'virtual:icons/material-symbols/menu'
    import IconClose  from 'virtual:icons/material-symbols/close'
    import IconLight  from 'virtual:icons/material-symbols/sunny'
    import IconDark   from 'virtual:icons/material-symbols/bedtime-outline'
    import IconSearch from 'virtual:icons/material-symbols/search'
    import IconArrowRight from 'virtual:icons/material-symbols/arrow-right-rounded'
    import IconFood   from 'virtual:icons/boxicons/bowl-hot-filled'

    // Workaround to force close
    // nav menu popover on navigation.
	beforeNavigate(() => {
        document.getElementById('nav-menu')
                .togglePopover(false);
    });

</script>


<header>
    <a href="/"><IconFood /></a>
    <h1>{page.data.title}</h1>
    <button class="icon"><IconSearch /></button>
    <button class="icon" popovertarget="nav-menu" >
        <nav id="nav-menu" popover closedby="any">
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="/mealplan">Mealplan</a>
                <ul>
                    <li><a href="/mealplan/day">Day</a></li>
                    <li><a href="/mealplan/week">Week</a></li>
                    <li><a href="/mealplan/month">Month</a></li>
                </ul>
            </li>
        </nav>
        <span class="menuIcon close"><IconClose/></span>
        <span class="menuIcon open"><IconMenu /></span>
    </button>

</header>



<style>

    /* By default, we display the open menu
       icon and hide the close menu icon. */
    .menuIcon {
        &.close { display: none;   }
        &.open  { display: inline; }
    }

    /* If the nav menu is open, we display
       the close menu icon and hide the open
       menu icon. */
    :popover-open ~ .menuIcon {
        &.open  { display: none;   }
        &.close { display: inline; }
    }

    /* If we're in the light color scheme, we
       display the dark theme icon and hide
       the light theme icon. */
    /* Unused
    @media (prefers-color-scheme: light) {
        .themeIcon {
            &.light { display: none;   }
            &.dark  { display: inline; }
        }
    }
    */

    /* If we're in the dark color scheme, we
       display the light theme icon and hide
       the dark theme icon. */
    /* Unused
    @media (prefers-color-scheme: dark) {
        .themeIcon {
            &.light { display: inline; }
            &.dark  { display: none;   }
        }
    }
    */

    button.icon {
        color: var(--color-fg);
        border-radius: 4px 0 0 0;
        border-top: 1px solid #303541; 
        border-left: 1px solid #303541; 
        border-bottom: none;
        border-right: none;
        margin-right: 6px;
        background-color: transparent;
        padding: 8px;

        &:hover {
            /*border-color: red;*/
        }
    }

    header {
        anchor-name: --menu-anchor;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 12px;
        padding-left:  12px;
        margin: 0;
        height: 48px;
        background-color: var(--color-bg-secondary);

        a {
            margin: 8px;
            color: var(--color-fg);
        }

        h1 {
            margin-right: auto;
            font-size: medium;
            color: var(--color-fg);
        }

    }

    nav {
        position: absolute;
        position-anchor: --menu-anchor;
        position-area: bottom;
        width: 98%;
        margin: 0;
        padding-left: 32px;
        border: none;
        border-bottom: 1px solid #303541;
        border-radius: 0 0 8px 8px;
        background-color: var(--color-bg-tertiary);
        list-style: none;

        a {
            display: block;
            font-size: medium;
            text-align: left;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

</style>
