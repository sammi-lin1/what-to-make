import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./RecipePage.css";
import { api } from "../api";

function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    fetch(api(`/recipes/${id}`))
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.log("Fetch error: ", err));
  }, [id]);

  // If recipe is not loaded yet, deliver loading message
  if (recipe.length === 0) {
    return <h1>Loading recipe...</h1>;
  }

  return (
    <div className="recipe-page-container">
      <h1 className="h1-recipe-title">
        {recipe.name} ({recipe.portions}){" "}
      </h1>

      <img src={`/images/recipeCardImg.png`} className="image" />

      <div className="ingredients-section">
        <h2 className="h2-ingredients">Ingredients</h2>
        {recipe.ingredients?.map((ingredient, index) => (
          <li className="li" key={index}>
            {ingredient}
          </li>
        ))}
      </div>
      <div className="steps-section">
        <h2 className="h2-steps">Steps</h2>
        <ol>
          {recipe.recipe.map((steps, index) => (
            <li key={index}>{steps}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipePage;
