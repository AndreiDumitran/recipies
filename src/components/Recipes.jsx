import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "./Link";
import Modal from "./ModalEdit";

const Recipes = () => {
  const [recipes, setRecipies] = useState([]);

  useEffect(() => {
    getRecipies();
  }, []);

  const getRecipies = async () => {
    const checker = localStorage.getItem("recipes");
    if (checker) setRecipies(JSON.parse(checker));
    else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("recipes", JSON.stringify(data.recipes));
      setRecipies(data.recipes);
    }
  };
  console.log(recipes);

  return (
    <div>
      <Modal recipes={recipes} where="home" />
      <Wrapper>
        {recipes.map((recipe, index) => {
          return (
            <Link href={"/recipe/" + index}>
              <Card key={recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
              </Card>
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};
export default Recipes;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  margin: 0.5rem;

  img {
    border-radius: 2rem;
    max-width: 100%;
    height: auto;
    position: absolute;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
    text-shadow: 2px 2px #000000;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
