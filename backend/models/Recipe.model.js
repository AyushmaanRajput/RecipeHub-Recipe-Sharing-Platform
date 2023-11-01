const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: String,
    image : [String],
    description: String,
    ingredients: [String],
    instructions: [String],
    caption: String,
    veg: Boolean,
    time: String,
    tags: [String],
    cuisine: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String
    }],
    rating: Number,
    macros: {
        calories : Number,
        carbs: Number,
        fats: Number,
        proteins: Number
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;