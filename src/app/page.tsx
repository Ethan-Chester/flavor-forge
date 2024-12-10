'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const toForge = () => {
    router.push('/forge'); // Replace '/target-page' with your route
  };

  const toRecipes = () => {
    router.push('/recipesList'); // Replace '/target-page' with your route
  };


  return (
    <div>
      <div>
        <div className="logo-text">
          <h1>FLAVOR <br/> FORGE</h1> 
        </div>
        
        <div className="menu-div-container">
          <div className="menu-div">
            <button onClick={toForge} className="button-1">Go To Forge</button>
            <button onClick={toRecipes} className="button-1">Explore Recipes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
