import fs      from 'node:fs';
import path    from 'node:path';
import matter  from 'gray-matter';

import { RECIPE_DIR } from '$app/env/private';

import { toInterval } from '$lib/date.ts';


// This function gets run on the server during
// "server-side-rendering" and during "pre-rendering".
export const load: PageServerLoad = async ({ url }) => {

    // Get list of source files
    const files = fs.globSync(`${RECIPE_DIR}/*.md`);


    const recipes = files.map((filepath) => {
        const { data } = matter.read(filepath, {});
        return {
            slug: path.basename(filepath, '.md'),
            ...data,
        };
    })

    const meals = recipes.flatMap((r) => r.mealplan?.map((d) => ({r: r, d: d}) ) || [])
                         .reduce((meals, data) => { 
                             (meals[data.d] ||= []).push(data.r);
                             return meals;
                         }, {});

    const paramStart = url.searchParams.get('start');
    const paramView  = url.searchParams.get('view');
    const mealplan = toInterval(paramStart, paramView).map((m) => ({
        ...m,
        recipes: meals[m.iso] || [],
    }));

    // Build return value (must be object)
    return {
        title: "Mealplan",
        mealplan: mealplan,
        recipes: recipes,
    };

};


// Gets executed on a form POST
export const actions = {
	delete: async ({request}) => {
        const formdata = await request.formData();
        const filepath = `${RECIPE_DIR}/${formdata.get('recipe')}.md`;
        
        const { data , content } = matter.read(filepath, {});
        data['mealplan'] = data['mealplan'].filter(date => date != formdata.get('date'));
		fs.writeFile(filepath, matter.stringify(content, data), () => {});
	},

	add: async ({request}) => {
        const formdata = await request.formData();
        const filepath = `${RECIPE_DIR}/${formdata.get('recipe')}.md`;

        const { data , content } = matter.read(filepath, {});
        (data['mealplan'] ||= []).push(formdata.get('date'));
		fs.writeFile(filepath, matter.stringify(content, data), () => {});
	}
};
