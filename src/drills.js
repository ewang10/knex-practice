require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

/*
Get all items that contain text

- A function that takes one parameter for 
    searchTerm which will be any string
- The function will query the shopping_list table 
    using Knex methods and select the rows which 
    have a name that contains the searchTerm using 
    a case insensitive match.
*/
function search(searchTerm) {
    knexInstance
        .select('name', 'price', 'checked', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log('SEARCH TERM', { searchTerm })
            console.log(result);
        });
}

search('Tofurkey');

/*
Get all items paginated

- A function that takes one parameter for 
    pageNumber which will be a number
The function will query the shopping_list 
    table using Knex methods and select the 
    pageNumber page of rows paginated to 6 
    items per page.
*/
function paginate(page) {
    const numPerPage = 6;
    const offset = numPerPage * (page - 1);
    knexInstance
        .select('id', 'name', 'price', 'checked', 'category')
        .from('shopping_list')
        .limit(numPerPage)
        .offset(offset)
        .then(result => {
            console.log(result);
        });
}

//paginate(2);

/*
Get all items added after date

- A function that takes one parameter for daysAgo 
    which will be a number representing a number 
    of days.
- This function will query the shopping_list table 
    using Knex methods and select the rows which 
    have a date_added that is greater than the daysAgo.
*/
function addedAfterDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'checked', 'category', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result);
        });
}

//addedAfterDate(1);

/*
Get the total cost for each category

- A function that takes no parameters
- The function will query the shopping_list 
    table using Knex methods and select the 
    rows grouped by their category and showing 
    the total price for each category.
*/
function totalCategoryCost() {
    knexInstance
        .select('category')
        .sum('price AS total')
        .avg('price')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result);
        });
}

totalCategoryCost();