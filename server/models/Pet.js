const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
    petName: {
      type: String,
      required: 'You need to enter a pet name!',
    },
    type: {
      type: String,
      required: 'Dog or Cat?' 
    },
    breed: {
      type: String,
      required: 'Please enter breed of your pet.'
    },
    username: {
        type: String,
        required: true
    },
    products: [
      {
        productName: {
          type: String
        },
        description: {
          type: String
        }
      }
  ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Pet = model('Pet', petSchema);

module.exports = Pet;