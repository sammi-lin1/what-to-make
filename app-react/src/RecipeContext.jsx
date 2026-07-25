import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, loading }}>
      {children}
    </RecipeContext.Provider>
  );
};
