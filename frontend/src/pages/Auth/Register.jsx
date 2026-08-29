import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const data = await registerUser(email, password);
      login(data.user, data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"
      >
        <h1 className="text-lg font-semibold text-zinc-100">Create your Sentinel account</h1>

        {error && (
          <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-2 text-xs text-rose-400">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-amber-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-amber-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {submitting ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-xs text-zinc-500 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-amber-400 hover:text-amber-300">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}