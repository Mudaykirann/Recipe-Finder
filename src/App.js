import './App.css';
import Meals from './components/Meals';
import RecipeInfo from './components/RecipeInfo';
import './components/styles.css'
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Meals/>}/>
      <Route path="/:MealId" element={<RecipeInfo/>} />
    </Routes>
    </>
  );
}

export default App;
