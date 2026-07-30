import { TbTriangleInvertedFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import recipes from "../mocks/recipes.json" with { type: "json" };
import ReceiptCard from "../components/ReceiptCard";

export default function MyRecipes() {
  return (
    <>
      <div className="p-8">
        <div className="flex items-center">
          <h2 className="font-poppins font-medium text-2xl mr-4">
            Mis Recetas
          </h2>
          <TbTriangleInvertedFilled />
        </div>
      </div>
      <hr className="border-1" />
      <div className="p-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
          {
            recipes.map((recipe) => 
              <Link key={recipe.id} to={`/mis-recetas/${recipe.id}`}>
                <ReceiptCard
                  key={recipe.id}
                  name={recipe.name}
                  time={recipe.time}
                  portions={recipe.portions}
                  urlPhoto={recipe.urlPhoto}
                />
              </Link>
            )
          }
        </div>
      </div>
    </>
  );
}
