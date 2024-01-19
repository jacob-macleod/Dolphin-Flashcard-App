import logo from './logo.svg';
import './App.css';
import BlobBackground from './componments/BlobBackground';
import GridContainer from './componments/GridContainer';
import GridItem from './componments/GridItem';

function App() {
  return (
    <>
      <GridContainer>
        <GridItem><h1>Hello World</h1></GridItem>
      </GridContainer>
    <BlobBackground />
    </>
  );
}

export default App;
