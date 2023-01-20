import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "../components/Link";
import Modal from "../components/ModalEdit";

const Recipe = () => {
  const currentPath = window.location.pathname;
  const recipeToFetch = currentPath.split("/");
  const storage = localStorage.getItem("recipes");
  const json = JSON.parse(storage);
  const details = json[recipeToFetch[2]];
  const RecipeContext = React.createContext("recipe");

  const [activeTab, setActiveTab] = useState("summary");

  const removeProduct = () => {
    const newRecipes = [];
    for (let i = 0; i < json.length; i++) {
      if (parseInt(recipeToFetch[2]) !== i) newRecipes[i] = json[i];
    }
    let filtered = newRecipes.filter((x) => x != undefined);

    localStorage.removeItem("recipes");
    localStorage.setItem("recipes", JSON.stringify(filtered));
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} />
      </div>
      <Info>
        <Button
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => setActiveTab("summary")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        <Button onClick={removeProduct}>
          <Link href="/">Delete recipe</Link>
        </Button>
        <Button>
          <Link href="/">Home</Link>
        </Button>
        {activeTab === "summary" && (
          <div>
            <h3
              dangerouslySetInnerHTML={{
                __html: details.summary,
              }}
            ></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
        <Modal recipes={json} where="recipe" />
      </Info>
    </DetailWrapper>
  );
};

export default Recipe;

const DetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img {
    border-radius: 2rem;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  h2 {
    margin-bottom: 2rem;
    line-height: 2.5rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 1rem;
`;
