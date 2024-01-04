const Recipe = require('../models/Recipe');

module.exports = {
    Query: {
        async recipe(_, { ID }) {
            return await Recipe.findById(ID);
        },
        async getRecipe(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
        }
    },
    Mutation: {
        async createRecipe(_, { recipeInput: { name, description } }) {
            const createRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            });
            const res = await createRecipe.save();
            return res; // Return the entire 'res' object
        },
        async deleteRecipe(_, { ID }) {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted;
        },
        async editRecipe(_, { ID, recipeInput: { name, description } }) {
            const wasEdited = (await Recipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
            return wasEdited;
        }
    }
};
