import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
import SettingsLayout from "./components/layouts/SettingsLayout/SettingsLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route,index) => {
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
              const SettingsLayouts = route.layout === null ? Fragment : SettingsLayout;
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
                              />
                            ))}
                          </Routes>
                        </Page>
                      </ProfileLayouts>
                    }
                  >
                  </Route>
                ) 
              } else if (route.layout === 'Settings Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <SettingsLayouts>
                        <Page>
                          <Routes>
                              {route.routes && route.routes.map((subRoute, subIndex) => (
                                <Route
                                    key={subIndex}
                                    path={subRoute.path}
                                    element={
                                      <subRoute.component/>
                                    }
                                />
                              ))}
                            </Routes>
                        </Page>
                      </SettingsLayouts>
                    }
                  />
                ) 
              }
            })
          }
        </Routes>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
