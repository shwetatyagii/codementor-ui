import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submissionService } from '../services/submissionService';
import { Code2, Clock, Plus, ChevronRight } from 'lucide-react';

const StatusBadge = ({ status }) => {
  if (status === 'COMPLETED') return <span className="badge-completed">Completed</span>;
  if (status === 'FAILED') return <span className="badge-failed">Failed</span>;
  return <span className="badge-pending">Pending</span>;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await submissionService.getDashboard();
        setDashboard(res.data);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-github-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-github-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-github-bg">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-github-text">
            {dashboard?.welcomeMessage || `Hello, ${user?.fullName}`}
          </h1>
          <p className="text-github-muted mt-1">
            Here's your coding activity overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-github-bg rounded-md">
                <Code2 className="w-5 h-5 text-github-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-github-text">
                  {dashboard?.totalSubmissions ?? 0}
                </div>
                <div className="text-github-muted text-sm">Total Submissions</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-github-bg rounded-md">
                <Clock className="w-5 h-5 text-github-green" />
              </div>
              <div>
                <div className="text-sm font-medium text-github-text">
                  {dashboard?.lastAnalyzedAt
                    ? new Date(dashboard.lastAnalyzedAt).toLocaleDateString()
                    : 'No submissions yet'}
                </div>
                <div className="text-github-muted text-sm">Last Analyzed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mb-8">
          <Link
            to="/analyze"
            className="btn-primary inline-flex items-center gap-2 px-6 py-2.5"
          >
            <Plus className="w-4 h-4" />
            Analyze New Code
          </Link>
        </div>

        {/* Recent Submissions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-github-text">Recent Submissions</h2>
            <Link
              to="/history"
              className="text-sm text-github-accent hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {dashboard?.recentSubmissions?.length === 0 ? (
            <div className="card text-center py-12">
              <Code2 className="w-8 h-8 text-github-muted mx-auto mb-3" />
              <p className="text-github-muted">No submissions yet.</p>
              <Link to="/analyze" className="text-github-accent text-sm hover:underline mt-2 inline-block">
                Submit your first code →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboard?.recentSubmissions?.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/history/${sub.id}`}
                  className="card hover:border-github-accent transition-colors duration-200 block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code2 className="w-4 h-4 text-github-muted flex-shrink-0" />
                      <div>
                        <div className="font-medium text-github-text text-sm">
                          {sub.title}
                        </div>
                        <div className="text-github-muted text-xs mt-0.5">
                          {new Date(sub.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {sub.timeComplexity && (
                        <span className="text-xs text-github-green font-mono hidden sm:block">
                          {sub.timeComplexity.split(' ')[0]}
                        </span>
                      )}
                      <StatusBadge status={sub.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;