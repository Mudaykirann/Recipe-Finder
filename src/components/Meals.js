import React, { useEffect, useState } from 'react'
import MealItem from './MealItem'
import RecipeIndex from './RecipeIndex'

const Meals = ({data}) => {
    const [url,setUrl] = useState("https:/www.themealdb.com/api/json/v1/1/search.php?f=b");
    const [item,setItem] = useState();
    const [show,setShow] = useState(false)
    const [search,setsearch] = useState();
    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=>{
            console.log(data.meals);
            setItem(data.meals);
            setShow(true);
        })
    },[url])

    const setIndex=(alpha)=>{
        setUrl(`https:/www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`)
        setsearch('');
    }

  const searchRecipe = () =>{
        setUrl(`https:/www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        setsearch('');
  }

  return (
    <>
      <div className='main'>
        <div className='heading'>
            <h1>Search Your Food Recipe</h1>
            <h4>Find Your Favorite Recipe Here..</h4>
        </div>
        <div className='search'>
            <input type='search' className='search-bar' onChange={(e) => setsearch(e.target.value)}/>
            <input type='submit' value="Search" className='btn' onClick={searchRecipe} />

        </div>
        <div className='container'>
            <MealItem/>
            {
                <MealItem data={item}/>
            }
        </div>
        <div className='indexContainer'>
            <RecipeIndex alphaIndex={(alpha) => setIndex(alpha)}/>
        </div>
      </div>
    </>
  )
}

export default Meals
