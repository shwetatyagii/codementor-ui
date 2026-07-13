import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { analysisService } from '../services/analysisService';
import { Brain, Clock, Database, Lightbulb, BookOpen, GitBranch, AlertTriangle, MessageSquare, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultCode = `import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`;

const Section = ({ icon, title, content, accent = 'text-github-accent' }) => {
  if (!content) return null;
  return (
    <div className="card">
      <div className={`flex items-center gap-2 mb-3 font-medium text-sm ${accent}`}>
        {icon}
        {title}
      </div>
      <p className="text-github-text text-sm leading-relaxed">{content}</p>
    </div>
  );
};

const CodeAnalysisPage = () => {
  const [code, setCode] = useState(defaultCode);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
  if (!code.trim()) {
    toast.error('Please enter some Java code');
    return;
  }

  if (!title.trim()) {
    toast.error('Please enter a problem title');
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const response = await analysisService.submitCode({
      code,
      title
    });

    setResult(response.data);
    toast.success('Analysis complete!');
  } catch (err) {
    const msg = err.response?.data?.message || 'Analysis failed';
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-github-bg">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-github-text">Code Analysis</h1>
          <p className="text-github-muted mt-1 text-sm">
            Paste your Java code and get instant AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Editor */}
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Problem title (e.g. Two Sum, Reverse String...)"
required
            />

            <div className="border border-github-border rounded-lg overflow-hidden">
              <div className="bg-github-surface px-4 py-2 border-b border-github-border flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-github-muted text-xs ml-2 font-mono">Java</span>
              </div>
              <Editor
                height="420px"
                language="java"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  padding: { top: 12, bottom: 12 },
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                }}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </button>
          </div>

          {/* Right — Results */}
          <div className="space-y-4">
            {!result && !loading && (
              <div className="card h-full flex items-center justify-center min-h-64">
                <div className="text-center">
                  <Brain className="w-10 h-10 text-github-muted mx-auto mb-3" />
                  <p className="text-github-muted text-sm">
                    Analysis results will appear here
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="card h-full flex items-center justify-center min-h-64">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-github-accent mx-auto mb-3 animate-spin" />
                  <p className="text-github-muted text-sm">AI is analyzing your code...</p>
                  <p className="text-github-muted text-xs mt-1">This may take a few seconds</p>
                </div>
              </div>
            )}

            {result && (
              <>
                {/* Complexity badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="card text-center">
                    <Clock className="w-4 h-4 text-github-green mx-auto mb-1" />
                    <div className="text-xs text-github-muted">Time Complexity</div>
                    <div className="text-github-green font-semibold font-mono text-sm mt-1">
                      {result.timeComplexity?.split(' ')[0]}
                    </div>
                  </div>
                  <div className="card text-center">
                    <Database className="w-4 h-4 text-github-accent mx-auto mb-1" />
                    <div className="text-xs text-github-muted">Space Complexity</div>
                    <div className="text-github-accent font-semibold font-mono text-sm mt-1">
                      {result.spaceComplexity?.split(' ')[0]}
                    </div>
                  </div>
                </div>

                <Section
                  icon={<Brain className="w-4 h-4" />}
                  title="Code Quality Review"
                  content={result.codeQualityReview}
                  accent="text-github-accent"
                />

                <Section
                  icon={<Lightbulb className="w-4 h-4" />}
                  title="Optimization Tips"
                  content={result.optimizationTips}
                  accent="text-yellow-400"
                />

                <Section
                  icon={<BookOpen className="w-4 h-4" />}
                  title="Best Practices"
                  content={result.bestPractices}
                  accent="text-github-green"
                />

                <Section
                  icon={<GitBranch className="w-4 h-4" />}
                  title="Alternative Approach"
                  content={result.alternativeApproach}
                  accent="text-purple-400"
                />

                <Section
                  icon={<AlertTriangle className="w-4 h-4" />}
                  title="Common Mistakes"
                  content={result.commonMistakes}
                  accent="text-github-red"
                />

                {/* Interview Questions */}
                {result.interviewQuestions?.length > 0 && (
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3 font-medium text-sm text-orange-400">
                      <MessageSquare className="w-4 h-4" />
                      Interview Questions
                    </div>
                    <ul className="space-y-2">
                      {result.interviewQuestions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-github-text">
                          <span className="text-github-muted font-mono text-xs mt-0.5 flex-shrink-0">
                            {i + 1}.
                          </span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalysisPage;