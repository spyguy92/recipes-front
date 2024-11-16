import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import { getRecipeSummary } from "../api";

interface Props {
  recipeId: string
  onClose: () => void
}
const RecipeModal = ({recipeId, onClose}: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const recipeSummary = await getRecipeSummary(recipeId);
        setRecipeSummary(recipeSummary);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);
  if (!recipeSummary) {
    return <></>;
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span onClick={onClose} className="close-btn">&times;</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
