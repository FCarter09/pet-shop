import React, {useState, useMutation} from "react";
import Auth from './utils/auth';
import { useLocation } from 'react-router-dom';
import {ADD_PRODUCT_TO_PET} from './utils/mutations'
//Might need these import in the future
// import { useQuery } from '@apollo/client';
// import {QUERY_PRODUCTS} from "./utils/queries";


const Product = () => {
    let petId = 0;

    try {
      const location = useLocation()
      petId = location.state.from
      console.log('PET ID FROM PREVIOUS SINGLE PET PAGE: ', petId)
    } catch (error){
      console.log(error)
    }

    console.log('petID', petId)
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

    const loggedIn = Auth.loggedIn();

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
                <div id='myProducts'>
                  <p id='productName'>{product.productName}</p>
                  <span>Description:</span><p>{product.description}</p>
                  <span>Price:</span><p>${product.price}.00</p>
                  <span>Quantity:</span><p>{product.quantity}</p>
                  {loggedIn & petId !==0 ? (
                  <button key={product.id} onClick={() => {
                        // make mutation to add service
                        // need petId, product.productName, product.description
                        // addProductToPetDB(petId, product.productName, product.description)
                  }} >Select {product.productName}</button>
                  ): <p></p>}
                </div>
              ))}
          </>
        );
      }

      // buttonClick.bind( product.productName, product.description)

    export default Product;