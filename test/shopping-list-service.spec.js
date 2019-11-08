const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe('Shooping List service object', () => {
    let db;
    let testShoppingList = [
        {
            id: 1,
            name: 'item1',
            price: '2.50',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Snack'
        },
        {
            id: 2,
            name: 'item2',
            price: '3.50',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: false,
            category: 'Main'
        },
        {
            id: 3,
            name: 'item3',
            price: '1.50',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: true,
            category: 'Breakfast'
        },
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
    });

    after(() => db.destroy());
    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());
    context('Given "shopping_list" has data', () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testShoppingList);
        });
        it('getShoppingList() resolves all items from "shopping_list" table', () => {
            return ShoppingListService.getShoppingList(db)
                .then(shoppingList => {
                    expect(shoppingList).to.eql(testShoppingList);
                });
        });
        it('getById() retrieves an item from "shopping_list" table', () => {
            const id = 2;
            const expectedItem = testShoppingList[id - 1];
            return ShoppingListService.getById(db, id)
                .then(actual => {
                    expect(actual).to.eql(expectedItem);
                });
        });

        it('updateItem() updates an item in the "shopping_list" table', () => {
            const id = 2;
            const updatedItem = {
                name: 'updated item',
                price: '0.50',
                date_added: new Date(),
                checked: false,
                category: 'Breakfast'
            };
            return ShoppingListService.updateItem(db, id, updatedItem)
                .then(() => ShoppingListService.getById(db, id))
                .then(item => {
                    expect(item).to.eql({
                        id: id,
                        ...updatedItem
                    });
                });
        });

        it('deleteItem() deletes an item from the "shopping_list" table', () => {
            const id = 2;
            return ShoppingListService.deleteItem(db, id)
                .then(() => ShoppingListService.getShoppingList(db))
                .then(allItems => {
                    const expected = testShoppingList.filter(item => item.id !== id);
                    expect(allItems).to.eql(expected);

                });
        });
    });

    context('Given "shopping_list" has no data', () => {
        it('getShoppingList() resolves an empty array', () => {
            return ShoppingListService.getShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                });
        });
        it('insertItem() inserts a new item in "shopping_list" table and resolves a new shopping list with an "id"', () => {
            const newItem = {
                name: 'new item',
                price: '5.25',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Lunch'
            };
            return ShoppingListService.insertitem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category
                    });
                });
        });
    });
});