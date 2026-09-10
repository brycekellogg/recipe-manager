import fs      from 'node:fs';
import path    from 'node:path';
import matter  from 'gray-matter';

import { RECIPE_DIR } from '$app/env/private';

// This function gets run on the server during
// "server-side-rendering" and during "pre-rendering".
export const load: PageServerLoad = async ({ params }) => {

    // Get list of source files
    const files = fs.globSync(`${RECIPE_DIR}/*.md`);

    // Build return value
    return {
        title: "Recipes",
        recipes: files.map((filepath) => {
            const { content, data } = matter.read(filepath);
            return {
                slug:  path.basename(filepath, '.md'),
                title: data.title || path.basename(filepath, '.md'),
            };
        })
    };
};

export const prerender = true;
