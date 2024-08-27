import React from "react";
import LoginComponent from "./Components/Auth/LoginComponent";
import NotesListComponent from "./Components/Notes/NotesListComponent";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HeaderComponent from "./Components/Header/HeaderComponent";
import RegisterComponent from "./Components/Auth/RegisterComponent";
import { AuthProvider } from "./Context/AuthContext";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import HomeComponent from "./Components/Home/HomeComponent";
import NoteCreateComponent from "./Components/Notes/NoteCreateComponent";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <br></br>
          <br></br>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginComponent />
                </PublicRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesListComponent />
                </PrivateRoute>
              }
            />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/" element={<HomeComponent />} />
            <Route
              path="/saveNotes"
              element={
                <PrivateRoute>
                  <NoteCreateComponent />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
