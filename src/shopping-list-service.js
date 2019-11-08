const shoppingListService = {
    getShoppingList(knex) {
        return knex
            .select('*')
            .from('shopping_list');
    },
    insertitem(knex, newItem) {
        return knex
            .into('shopping_list')
            .insert(newItem)
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('shopping_list')
            .where({id})
            .first();
    },
    updateItem(knex, id, item) {
        return knex('shopping_list')
            .where({id})
            .update(item);
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({id})
            .delete();
    }
};

module.exports = shoppingListService;