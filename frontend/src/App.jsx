import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import TasksPage from "./Pages/Tasks";
import ProjectsPage from "./Pages/Projects";
import AgendaPage from "./Pages/Agenda";

// ==============================
// ROUTES
// ==============================

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/calendar" element={<AgendaPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
export default App;