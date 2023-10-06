import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route,index) => {
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component;
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <Layout>
                        <Page/>
                      </Layout>
                    }
                  />
                ) 
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
