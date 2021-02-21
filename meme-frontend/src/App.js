import "./App.css";

import Form from "./Components/Form/Form";
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Navigation heading={"XMeme"} />
      <Form />
      <Footer
        title={"About"}
        description={
          "This is a platform where you can share your memes with others and have fun with shared memes by other users"
        }
      />
    </div>
  );
};

export default App;
