'use client';
import Link from "next/link";
import { useIngredients } from "../Hooks/ingredients";
import { useMethods } from "../Hooks/methods";
import { Tag } from "../types/tag";
import { useRouter } from "next/navigation";

type Ingredient = {
  id: number;
  name: string;
  tags: Tag[]; 
};

type Method = {
  id: number;
  template: string;
};


export default function forge() {

  const ingredients = useIngredients<Ingredient[]>();
  const methods = useMethods<Method[]>();

  const router = useRouter();

  const goToGenerate = () => {
    router.push('./generateRecipe')
  }

  return (
    <div>
      <Link className="back-link" href={"/"}>MENU</Link>
      <div className="logo-banner shadow">FLAVOR FORGE</div>
      <div className="forge-generate-button" onClick={goToGenerate}>
        <button className="button-1 shadow">Generate Recipe</button>
      </div>
      <div className="ingredients">
        <h1 className="shadow">Ingredients</h1>
        <button className="shadow"><Link className="no-link-underline" href={"addIngredient"}>+</Link></button>
      </div>
      <hr className="list-hr-1 shadow"/>

      
          <div className="ingredients-list">
          {ingredients ? ingredients.map((ingredient) => (
          <div className="ingredient-item shadow">
            <div className="ingredient">{ingredient.name}</div>
            <div className="tags-container">
              {ingredient.tags.map((tag) => (
                <div className="tag" key={tag.id}>{tag.name}</div>
              ))}
            </div>
          </div>
          )) : <div>LOADING...</div>}
        </div>
      
      

      <div className="cooking-methods shadow">
        <h1 className="shadow">Cooking Methods</h1>
        <button className="shadow"><Link className="no-link-underline" href={"addMethod"}>+</Link></button>
      </div>
      <hr className="list-hr-2 shadow"/>
      
      <div className="methods-list">
        {methods ? methods.map((method) => (
          <div className="method-item shadow">{method.template}</div>
        )) : <div>LOADING...</div>}
      </div>
      
    </div>
  );
}
