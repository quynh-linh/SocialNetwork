import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route,index) => {
              //const Layout = route.layout === null ? Fragment : DefaultLayout;
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
              }
            })
          }
          {
            privateRoutes.map((route,index) => {
              const ProfileLayouts = route.layout === null ? Fragment : ProfileLayout;
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component;
              if (route.layout === 'Default Layout'){
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
              } else if (route.layout === 'Profile Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <ProfileLayouts>
                        <Page>
                          <Routes>
                            {route.routes && route.routes.map((subRoute, subIndex) => (
                              <Route
                                  key={subIndex}
                                  path={subRoute.path}
                                  element={
                                    <subRoute.component/>
                                  }
                                  exact={subRoute.exact}
                              />
                            ))}
                          </Routes>
                        </Page>
                      </ProfileLayouts>
                    }
                  >
                  </Route>
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
