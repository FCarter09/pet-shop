import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from './utils/queries';
import Auth from './utils/auth';
import { Link } from 'react-router-dom';


const SinglePet = props => {

  let productId = 0

  const { id: petId } = useParams();
    console.log(petId); 

    const { loading, data } = useQuery(QUERY_PET, {
      variables: { id: petId }
    });
    
    const pet = data?.pet || {};
    
    if (loading) {
      return <div>Loading...</div>;
    }

    const loggedIn = Auth.loggedIn();

  return (
    
    <div>
      <h1>{pet.petName}</h1>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {pet.username}
          </span>
        </p>
        <div className="card-body">
         <span>Name:</span> <p>{pet.petName}</p>
          <span>Type:</span><p>{pet.type}</p>
          <span>Breed:</span><p>{pet.breed}</p>
          {loggedIn & productId !==0 ? (
            <div className="selected-service">
            <span>Service:</span>
            <p>{pet.productName}</p>
            <p>{pet.description}</p>
            </div>     
            ): <p></p>}

          <Link to={"/product"} state={{from: petId}} ><button>Go to Products/Services</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePet;