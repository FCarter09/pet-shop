
import React, { useState } from "react";
import Auth from './utils/auth';
import { useLocation } from 'react-router-dom';
import './index.css';
import { ADD_PRODUCT_TO_PET } from './utils/mutations';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

//Might need these import in the future
// import { useQuery } from '@apollo/client';
// import {QUERY_PRODUCTS} from "./utils/queries";


const Product = () => {
    let petId = 0;

    try {
      const location = useLocation()
      petId = location.state.from || 0
      console.log('PET ID FROM PREVIOUS SINGLE PET PAGE: ', petId)
    } catch (error){
      console.log(error)
    }

    console.log('petID', petId)

    const loggedIn = Auth.loggedIn();
    // query to database for products
    // const {loading, data} = useQuery(QUERY_PRODUCTS)
    // console.log('PRODUCTS DATA:', data && data)
    const [productData, setProducts] = useState([
      {id:1, productName: "Dog Boarding", description: "One Night", price: 100, quantity: 20},
      {id:2, productName: "Cat Boarding", description: "One Night", price: 100, quantity: 20},
      {id:3, productName: "Dog Grooming", description: "Hair Trimming", price: 50, quantity: 20},
      {id:4, productName: "Cat Grooming", description: "Hair Trimming", price: 50, quantity: 20},
      {id:5, productName: "Dog Toy", description: "Bone", price: 10, quantity: 20},
      {id:6, productName: "Cat Toy", description: "Scratching Post",  price: 10, quantity: 20}
    ])

     // Apollo Client mutation hook for adding a product to a pet
     const [addProductToPetDB] = useMutation(ADD_PRODUCT_TO_PET);

    // Function to handle product selection and mutation
    const addProductToPet = async (productName, description, petId) => {
      try {
          // Execute the mutation to add the selected product to the pet's record
          const { data } = await addProductToPetDB({
            variables: { petId, productName, description }
          });

          console.log('Product added to pet:', data);
        } catch (error) {
          console.error('Error adding product to pet:', error);
        }
      };

    // consider this
    // const [addProductToPetDB, { error, data: petData}] = useMutation(ADD_PRODUCT_TO_PET)
    // const addProductToPet = async (event) => {
    //   try {
    //     //takes pet data and executes Add_PRODUCT_TO_PET
    //     const {petData} = await addProductToPetDB ({
    //       variables: { ...petData}
    //     })
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
  
    
        return (
          <>
            <h1>Products/Services</h1>
            {productData.map((product) => (
              <div key={product.id} id="myProducts">
                <p id="productName">{product.productName}</p>
                <span>Description:</span><p>{product.description}</p>
                <span>Price:</span><p>${product.price}.00</p>
                <span>Quantity:</span><p>{product.quantity}</p>

                {loggedIn && petId !== 0 ? (
                  <Link to={`/pet/${petId}`} state={{ from: petId }}>
                    <button
                      className="selectProduct-btn"
                      onClick={() => {
                        console.log('Adding product to pet...');
                        addProductToPet(product.productName, product.description, petId);
                      }}
                    >
                      Select {product.productName}
                    </button>
                  </Link>
                ) : (
                  <p>Please log in to select a product</p>
                )}
              </div>
            ))}
          </>
        );
      }

    export default Product;