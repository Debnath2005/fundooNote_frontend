import './App.css';
import ContextHoc from './components/ContextHoc/ContextHoc';
import ModelRoutes from './ModelRoutes';

function App() {
  return (
    <div className="App">
      <ContextHoc>
         <ModelRoutes/>
      </ContextHoc>  
    </div>
  );
}

export default App;
