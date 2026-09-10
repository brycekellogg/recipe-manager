<script lang="ts">
	import { page } from '$app/state';
    import { titleCase } from 'title-case';
    import MarkdownIt from 'markdown-it';

    // Build the page title
    const title = page.data.title; //page.data.data.name || titleCase(page.params.slug.replace('-', ' '));

    // Render markdown
    const markdownRenderer = new MarkdownIt()
    const renderResult = markdownRenderer.render(page.data.content);

</script>

<main class="recipe">
    {@html renderResult}
</main>

<style>
	main.recipe :global {
		a { color: hotpink }
		img { width: 100% }
	}
</style>
