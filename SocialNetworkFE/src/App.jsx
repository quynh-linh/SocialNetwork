import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
import SettingsLayout from "./components/layouts/SettingsLayout/SettingsLayout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectionsLayout from "./components/layouts/ConnectionsLayout/ConnectionsLayout";
import SearchLayout from "./components/layouts/SearchLayout";
import PostsLayout from "./components/layouts/PostsLayout";
import MessagesLayout from "./components/layouts/MessagesLayout";
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
              return null;
            })
          }
          {
            privateRoutes.map((route,index) => {
              const ProfileLayouts = route.layout === null ? Fragment : ProfileLayout;
              const SettingsLayouts = route.layout === null ? Fragment : SettingsLayout;
              const ConnectionsLayouts = route.layout === null ? Fragment : ConnectionsLayout;
              const SearchLayouts = route.layout === null ? Fragment : SearchLayout;
              const PostsLayouts = route.layout === null ? Fragment : PostsLayout;
              const MessagesLayouts = route.layout === null ? Fragment : MessagesLayout;
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component ? route.component : null;
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
              } else if (route.layout === 'Connections Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <ConnectionsLayouts>
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
                      </ConnectionsLayouts>
                    }
                  />
                ) 
              } else if (route.layout === 'Search Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <SearchLayouts>
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
                      </SearchLayouts>
                    }
                  />
                ) 
              } else if (route.layout === 'Posts Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <PostsLayouts>
                        <Page/>
                      </PostsLayouts>
                    }
                  />
                ) 
              } else if (route.layout === 'Messages Layout'){
                return (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <MessagesLayouts>
                        <Page/>
                      </MessagesLayouts>
                    }
                  />
                ) 
              }
              return null;
            }) 
          }
        </Routes>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
