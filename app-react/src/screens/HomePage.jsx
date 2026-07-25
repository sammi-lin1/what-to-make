import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../RecipeContext";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { recipes, loading } = useContext(RecipeContext);

  if (loading) return <p>loading...</p>;

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  // Event Handlers
  // generates a random id number of a recipe in a specific category and navigates to that URL
  function generateRandomRecipe(category) {
    let filteredRecipes = recipes.filter(
      (recipe) => recipe.category === category,
    );

    let minId = filteredRecipes[0].id;
    let maxId = filteredRecipes.at(-1).id;

    let randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

    navigate(`/recipe/${randomId}`);
  }

  return (
    <div className="homepage-container">
      <h2 className="h2-title">Choose a category to randomly generate</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            category={category}
            onClick={() => generateRandomRecipe(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
