import { useContext } from "react";
import { RecipeContext } from "../RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

function BrowsePage() {
  const navigate = useNavigate();
  const { recipes, loading } = useContext(RecipeContext);

  if (loading) {
    return <p>Loading delicious recipes...</p>;
  }

  function navigateRecipe(index) {
    console.log("heyy")
    navigate(`/recipe/${index}`);
  }

  return (
    <>
      {recipes.length === 0 ? (
        <p>Loading delicious recipes...</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onClick={() => navigateRecipe(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default BrowsePage;
