const Category= require('../models/Category');

module.exports = {
    Query: {
        async category(_, { ID }) {
            return await Category.findById(ID);
        },
        async getCategory(_, { amount }) {
            return await Category.find().sort({ createdAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        async createCategory(_, { CategoryInput: { name, description } }) {
            const createCategory = new Category({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
            });
            const res = await createCategory.save();
            return res; // Return the entire 'res' object
        },
        async deleteCategory(_, { ID }) {
            const wasDeleted = (await Category.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted;
        },
        async editCategory(_, { ID, CategoryInput: { name, description } }) {
            const wasEdited = (await Category.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
            return wasEdited;
        }
    }
};
