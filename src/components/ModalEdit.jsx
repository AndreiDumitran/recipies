import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Modal = (recipes, props) => {
  const currentPath = window.location.pathname;
  const recipeToFetch = currentPath.split("/");
  const [isOpen, setIsOpen] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [textarea, setTextarea] = useState("");

  let index = recipeToFetch[2];
  if (index === undefined) index = 0;

  const handleOpen = () => {
    setIsOpen(true);
  };

  console.log(recipes.where);

  const handleClose = () => {
    setIsOpen(false);
    setInput1("");
    setInput2("");
    setTextarea("");
  };

  const saveToMemory = () => {
    if (recipes.where === "recipe") {
      if (input1 !== "") recipes.recipes[index].title = input1;
      if (input2 !== "") recipes.recipes[index].image = input2;
      if (textarea !== "") recipes.recipes[index].summary = textarea;
    } else {
      let newItem = {
        title: input1,
        image: input2,
        summary: textarea,
      };
      recipes.recipes[recipes.recipes.length] = newItem;
    }
    localStorage.setItem("recipes", JSON.stringify(recipes.recipes));
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit recipe</Button>
      {isOpen && (
        <div>
          <ModalWrapper>
            {recipes.where === "recipe" && <h2>Edit recipe</h2>}
            {recipes.where === "home" && <h2>Add recipe</h2>}
            <div>
              <legend>
                <h3>Title</h3>
              </legend>
              <Input
                type="text"
                placeholder=""
                defaultValue={recipes.recipes[index].title}
                required
                onChange={(e) => setInput1(e.target.value)}
              />
              <legend>
                <h3>Image</h3>
              </legend>
              <Input
                type="text"
                placeholder="Input 2"
                defaultValue={recipes.recipes[index].image}
                required
                onChange={(e) => setInput2(e.target.value)}
              />
              <legend>
                <h3>Summary</h3>
              </legend>
              <Textarea
                placeholder="Textarea"
                defaultValue={recipes.recipes[index].summary}
                required
                onChange={(e) => setTextarea(e.target.value)}
              />
            </div>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={() => {
                saveToMemory();
                handleClose();
                window.location.reload();
              }}
            >
              Save
            </Button>
          </ModalWrapper>
          <Overlay onClick={handleClose} className="overlay" />
        </div>
      )}
    </div>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  width: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px #ccc;
  z-index: 100;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Button = styled.button`
  padding: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline;
`;

const Input = styled.input`
  padding: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;
