import { Link } from 'react-router-dom';
import { Code2, Zap, Brain, BookOpen, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-5 h-5 text-github-accent" />,
    title: 'AI Code Review',
    desc: 'Get instant feedback on code quality, structure, and correctness from Llama 3.3 70B.',
  },
  {
    icon: <Zap className="w-5 h-5 text-github-green" />,
    title: 'Complexity Analysis',
    desc: 'Understand time and space complexity with detailed Big O explanations.',
  },
  {
    icon: <BookOpen className="w-5 h-5 text-purple-400" />,
    title: 'Interview Prep',
    desc: 'Get follow-up interview questions tailored to your submitted code.',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-github-bg">

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">

        <div className="inline-flex items-center gap-2 bg-github-surface border border-github-border rounded-full px-3 py-1 text-xs text-github-muted mb-8">
          <span className="w-1.5 h-1.5 bg-github-green rounded-full animate-pulse"></span>
          Powered by Llama 3.3 70B
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-github-text mb-6 leading-tight">
          AI-Powered Java
          <span className="text-github-accent block">Code Mentor</span>
        </h1>

        <p className="text-github-muted text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Submit your Java code and receive instant analysis — complexity, 
          optimizations, best practices, and interview questions.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/signup" className="btn-primary flex items-center gap-2 px-6 py-2.5">
            Start Analyzing
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="btn-secondary px-6 py-2.5">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card hover:border-github-accent transition-colors duration-200">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-github-text mb-2">{f.title}</h3>
              <p className="text-github-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Code preview block */}
        <div className="mt-8 card font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-github-border">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-github-muted text-xs ml-2">TwoSum.java</span>
          </div>
          <pre className="text-github-text text-xs leading-relaxed overflow-x-auto">
{`public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`}
          </pre>
          <div className="mt-4 pt-3 border-t border-github-border grid grid-cols-2 gap-3">
            <div className="bg-github-bg rounded p-2">
              <div className="text-github-muted text-xs">Time Complexity</div>
              <div className="text-github-green font-semibold text-sm">O(n)</div>
            </div>
            <div className="bg-github-bg rounded p-2">
              <div className="text-github-muted text-xs">Space Complexity</div>
              <div className="text-github-accent font-semibold text-sm">O(n)</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;