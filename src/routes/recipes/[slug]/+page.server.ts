import { error } from '@sveltejs/kit';
import { RECIPE_DIR } from '$app/env/private';

import fs from 'node:fs';

import { titleCase } from 'title-case';
import matter from 'gray-matter';

export const entries: EntryGenerator = () => {
    return [
        { slug: 'ahi-poke' },
        { slug: 'rice-a-roni' }
    ];
};

// This function gets run on the server during
// "server-side-rendering" and during "pre-rendering".
export const load: PageServerLoad = async ({ params }) => {
    const path = `${RECIPE_DIR}/${params.slug}.md`;
    
    // If the source files doesn't exist, we return a 404
    if (!fs.existsSync(path)) {
        error(404, "no such recipe")
    }

    // Read in file and parse out front matter
    const { content, data } = matter.read(path);

    // TODO: filter out access restricted info if not logged in
    
    // Build return value
    return {
        title: data.name || titleCase(params.slug.replace('-', ' ')),
        contentType: "application/markdown",
        content: content,
        data: data,
    };
};

export const prerender = true;
