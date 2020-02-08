import { selected_getpopular } from './HomeSelector';

/* 
    Combine all the selectors in here and export them at the same time,
    having index.js will help the code to be more readable and easy to manage for future,
    if you have more selectors, you can add them into this section 
    then call them at your container page
*/

export const selectors_home = (state) => {
    const getpopular = selected_getpopular(state);
    return { getpopular }
}