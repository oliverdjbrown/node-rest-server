const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, state, ...category } = this.toObject();
    return category;
  };

module.exports = model('Categories', CategorySchema);