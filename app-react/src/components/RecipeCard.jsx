import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeCard({recipe}) {

     
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            {/* <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p> */}
        </div>
    );
}

export default RecipeCard;