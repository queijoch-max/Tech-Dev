import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import TasksPage from "./Pages/Tasks";
import ProjectsPage from "./Pages/Projects";
import AgendaPage from "./Pages/Agenda";
import NotesPage from "./Pages/Notes";
import LoginPage from "./Pages/Login";

// ==============================
// PROTECTION DES ROUTES
// ==============================

function RequireAuth({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// ==============================
// ROUTES
// ==============================

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <RequireAuth>
                            <Layout>
                                <TasksPage />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <RequireAuth>
                            <Layout>
                                <ProjectsPage />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <RequireAuth>
                            <Layout>
                                <AgendaPage />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <RequireAuth>
                            <Layout>
                                <NotesPage />
                            </Layout>
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
