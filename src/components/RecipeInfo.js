import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
let vid='';
const RecipeInfo = () => {
  const [item, setItem] = useState(null);
  const { MealId } = useParams();

  useEffect(() => {
    if (MealId !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then((res) => res.json())
        .then((data) => {
          // Check if data.meals[0] exists before setting the state
          if (data.meals && data.meals.length > 0) {
            console.log(data.meals)
            setItem(data.meals[0]);
          } else {
            // Handle the case where no meal data is found for the given MealId
            setItem(null);
          }
        })
        .catch((error) => {
          // Handle any fetch errors here
          console.error("Error fetching meal data:", error);
          setItem(null); // You can set item to null or handle the error differently
        });
    }
  }, [MealId]);
  if(item){
    const url = item.strYoutube;
    const str = url.split("=")
    vid = str[str.length-1];
  }
  return (
    <>
      {!item ? (
        <div>Loading...</div> // Display a loading message or spinner while fetching data
      ) : (
        <>
        <div className='totalcontent'>
        <div className='content'>
            <img src={item.strMealThumb} alt="" />
            <div className='inner-content'>
              <h1>{item.strMeal}</h1>
              <h2>{item.strArea} Food</h2>
              <h3>Category : {item.strCategory}</h3>
              <h4><a href="#link">Vedio</a></h4>
            </div>
          </div>
          <div className='recipe-details'>
            <div className='ingredients'>
              <h2>Ingredients</h2>
              <br/>
              <ul className='ingredItems'>
                {/* Map over ingredients and measures here */}
                {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => (
                  <li className='ingredItem' key={index}>
                    {item[`strIngredient${index}`]}  {item[`strMeasure${index}`]}
                  </li>
                ))}
              </ul>
            </div>
            <div className='instructions'>
              <h2>Instructions</h2>
              <h4>{item.strInstructions}</h4>
            </div>
          </div>
          <div id='link' className='video'>
              <iframe className='frame' src={`https://www.youtube.com/embed/${vid}`}>
              </iframe>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default RecipeInfo;
