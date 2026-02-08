import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardEleve from "./pages/dashboard/DashboardEleve";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import DashboardProf from "./pages/dashboard/DashboardProf";

// Route protégée par rôle
// On vérifie qu'un user est connecté ET qu'il a le bon rôle.
const PrivateRouteByRole = ({ element, role, user, loading }) => {
  if (loading) return null; // on évite de flasher la page pendant le chargement initial

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Utilisateur connecté mais mauvais rôle → on le renvoie vers son dashboard
    if (user.role === "ADMIN") return <Navigate to="/dashboard/admin" replace />;
    if (user.role === "PROF") return <Navigate to="/dashboard/prof" replace />;
    if (user.role === "ELEVE") return <Navigate to="/dashboard/eleve" replace />;
    return <Navigate to="/login" replace />;
  }

  return element;
};

function App() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      {/* Page d'accueil → redirection vers login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Page de connexion : si déjà connecté, redirige vers le bon dashboard */}
      <Route
        path="/login"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <Navigate to="/dashboard/admin" replace />
            ) : user.role === "PROF" ? (
              <Navigate to="/dashboard/prof" replace />
            ) : (
              <Navigate to="/dashboard/eleve" replace />
            )
          ) : (
            <Login />
          )
        }
      />

      {/* Dashboards protégés par rôle */}
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRouteByRole
            user={user}
            loading={loading}
            role="ADMIN"
            element={<DashboardAdmin />}
          />
        }
      />

      <Route
        path="/dashboard/prof"
        element={
          <PrivateRouteByRole
            user={user}
            loading={loading}
            role="PROF"
            element={<DashboardProf />}
          />
        }
      />

      <Route
        path="/dashboard/eleve"
        element={
          <PrivateRouteByRole
            user={user}
            loading={loading}
            role="ELEVE"
            element={<DashboardEleve />}
          />
        }
      />

      {/* Page non trouvée pour toute autre URL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
