import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { submissionService } from '../services/submissionService';
import { ArrowLeft, Clock, Database, Brain, Lightbulb, BookOpen, GitBranch, AlertTriangle, MessageSquare } from 'lucide-react';

const Section = ({ icon, title, content, accent }) => {
  if (!content) return null;
  return (
    <div className="card">
      <div className={`flex items-center gap-2 mb-2 font-medium text-sm ${accent}`}>
        {icon}{title}
      </div>
      <p className="text-github-text text-sm leading-relaxed">{content}</p>
    </div>
  );
};

const SubmissionDetailPage = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await submissionService.getById(id);
        setSubmission(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-github-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-github-accent"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-github-bg flex items-center justify-center">
        <p className="text-github-muted">Submission not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-github-bg">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <Link to="/history" className="flex items-center gap-1.5 text-github-muted hover:text-github-text text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-github-text">{submission.title}</h1>
          <p className="text-github-muted text-sm mt-1">
            {new Date(submission.submittedAt).toLocaleString()}
          </p>
        </div>

        {/* Complexity */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card text-center">
            <Clock className="w-4 h-4 text-github-green mx-auto mb-1" />
            <div className="text-xs text-github-muted">Time Complexity</div>
            <div className="text-github-green font-semibold font-mono text-sm mt-1">
              {submission.timeComplexity || 'N/A'}
            </div>
          </div>
          <div className="card text-center">
            <Database className="w-4 h-4 text-github-accent mx-auto mb-1" />
            <div className="text-xs text-github-muted">Space Complexity</div>
            <div className="text-github-accent font-semibold font-mono text-sm mt-1">
              {submission.spaceComplexity || 'N/A'}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Section icon={<Brain className="w-4 h-4" />} title="Code Quality Review" content={submission.codeQualityReview} accent="text-github-accent" />
          <Section icon={<Lightbulb className="w-4 h-4" />} title="Optimization Tips" content={submission.optimizationTips} accent="text-yellow-400" />
          <Section icon={<BookOpen className="w-4 h-4" />} title="Best Practices" content={submission.bestPractices} accent="text-github-green" />
          <Section icon={<GitBranch className="w-4 h-4" />} title="Alternative Approach" content={submission.alternativeApproach} accent="text-purple-400" />
          <Section icon={<AlertTriangle className="w-4 h-4" />} title="Common Mistakes" content={submission.commonMistakes} accent="text-github-red" />

          {submission.interviewQuestions?.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-3 font-medium text-sm text-orange-400">
                <MessageSquare className="w-4 h-4" />
                Interview Questions
              </div>
              <ul className="space-y-2">
                {submission.interviewQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-github-text">
                    <span className="text-github-muted font-mono text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code */}
          <div className="card">
            <div className="text-sm font-medium text-github-muted mb-3">Submitted Code</div>
            <pre className="text-xs text-github-text font-mono bg-github-bg rounded p-4 overflow-x-auto leading-relaxed">
              {submission.codeSnippet}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubmissionDetailPage;