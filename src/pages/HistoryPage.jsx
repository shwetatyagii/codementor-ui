import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submissionService } from '../services/submissionService';
import { Search, Trash2, Code2, Clock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const StatusBadge = ({ status }) => {
  if (status === 'COMPLETED') return <span className="badge-completed">Completed</span>;
  if (status === 'FAILED') return <span className="badge-failed">Failed</span>;
  return <span className="badge-pending">Pending</span>;
};

const HistoryPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const res = await submissionService.getAll();
      setSubmissions(res.data);
    } catch (err) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim().length > 1) {
      try {
        const res = await submissionService.search(val);
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
      }
    } else if (val.trim() === '') {
      fetchSubmissions();
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Delete this submission?')) return;
    setDeleting(id);
    try {
      await submissionService.deleteById(id);
      setSubmissions(submissions.filter(s => s.id !== id));
      toast.success('Submission deleted');
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-github-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-github-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-github-bg">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-github-text">Submission History</h1>
            <p className="text-github-muted text-sm mt-1">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/analyze" className="btn-primary text-sm py-2">
            + New Analysis
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-github-muted" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="input pl-9"
            placeholder="Search by title..."
          />
        </div>

        {/* List */}
        {submissions.length === 0 ? (
          <div className="card text-center py-12">
            <Code2 className="w-8 h-8 text-github-muted mx-auto mb-3" />
            <p className="text-github-muted">No submissions found.</p>
            <Link to="/analyze" className="text-github-accent text-sm hover:underline mt-2 inline-block">
              Analyze your first code →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <Link
                key={sub.id}
                to={`/history/${sub.id}`}
                className="card hover:border-github-accent transition-colors duration-200 block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <Code2 className="w-4 h-4 text-github-muted flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-github-text text-sm truncate">
                        {sub.title}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-github-muted text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                        {sub.timeComplexity && (
                          <span className="text-github-green text-xs font-mono">
                            {sub.timeComplexity.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={sub.status} />
                    <button
                      onClick={(e) => handleDelete(sub.id, e)}
                      disabled={deleting === sub.id}
                      className="text-github-muted hover:text-github-red transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-github-muted" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;