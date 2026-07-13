import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Code2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [form, setForm] = useState({
    username: '', email: '', password: '', fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.signup(form);
      login(response.data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Code2 className="w-8 h-8 text-[#58a6ff] mx-auto mb-3" />
          <h1 className="text-xl font-semibold text-[#e6edf3]">Create your account</h1>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-[#8b949e] mb-1.5">Full name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
                placeholder="Shweta Tyagi"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8b949e] mb-1.5">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
                placeholder="shweta"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#8b949e] mb-1.5">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#8b949e] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 pr-10 text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
                  placeholder="Min 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#58a6ff] hover:bg-blue-400 text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

          </form>
        </div>

        <p className="text-center text-sm text-[#8b949e] mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#58a6ff] hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;