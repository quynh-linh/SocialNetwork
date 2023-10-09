import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route,index) => {
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const AuthLayouts = route.layout === null ? Fragment : AuthLayout;
              const Page = route.component;
              if(route.layout === 'Auth Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <AuthLayouts>
                        <Page/>
                      </AuthLayouts>
                    }
                  />
                ) 
              } else if (route.layout === 'Default Layout'){
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
              }
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
