export default function Home() {
  return (
    <div>
      <div>
        <h1 className="flex justify-center text-">Flavor <br/> Forge</h1>
        <div className="fixed bottom-0 w-full flex flex-col justify-center items-center bg-blue-500 pt-12 pb-12">
          <button className="mb-2 p-3 bg-green-500 rounded-full">Explore Recipes</button>
          <button className="p-3 bg-green-500 rounded-full">Generate New Recipe</button>
        </div>
      </div>
    </div>
  );
}
