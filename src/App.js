import React,{useEffect,useState} from 'react';
import Recpie from './Recipe';
import './App.css';

const App =()=>{
  const APP_ID='20753a48';
  const APP_KEY='e05ab019c8e51966db34f21a875021f1';
  /*const [counter,setCounter]=useState(0);*/
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken')


  useEffect(()=>{
    getRecipes();
},[query])

    const getRecipes=async()=>{
      const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data=await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    }
const updateSearch=e=>{
    setSearch(e.target.value);
}
const getSearch=e=>{
    e.preventDefault(); //so that page do not refresh
    setQuery(search);
    setSearch("");
}
  return(
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input type='text' className="search-bar" value={search} onChange={updateSearch}/>
          <button type='submit'  className="search-button">search</button>
        </form>
          <div className="recipes">
          {recipes.map(recipe=>(
              <Recpie key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
              image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}
              />
          ))}
          </div>


       {/* <h1 onClick={()=>setCounter(counter+1)}>{counter}</h1>*/}
      </div>
  );
}

export default App;
