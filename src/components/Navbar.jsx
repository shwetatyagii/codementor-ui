import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, LogOut, User, History, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#161b22] border-b border-[#30363d] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            to={user ? '/dashboard' : '/'}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Code2 className="w-5 h-5 text-[#58a6ff]" />
            <span className="font-semibold text-[#e6edf3] text-sm">CodeMentor AI</span>
          </Link>

          {/* Nav links */}
          {user && (
            <div className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-[#0d1117] text-[#e6edf3]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/analyze"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive('/analyze')
                    ? 'bg-[#0d1117] text-[#e6edf3]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span className="hidden sm:inline">Analyze</span>
              </Link>

              <Link
                to="/history"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive('/history')
                    ? 'bg-[#0d1117] text-[#e6edf3]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </Link>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-[#8b949e] hover:text-[#f85149] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-[#30363d] hover:border-[#58a6ff] text-[#e6edf3] text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#58a6ff] hover:bg-blue-400 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;