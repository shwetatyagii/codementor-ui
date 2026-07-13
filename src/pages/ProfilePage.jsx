import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { submissionService } from '../services/submissionService';
import { User, Mail, Calendar, Edit3, Check, X, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await submissionService.getProfile();
        setProfile(res.data);
        setFullName(res.data.fullName || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleEdit = () => {
    setFullName(profile?.fullName || '');
    setEditing(true);
  };

  const handleCancel = () => {
    setFullName(profile?.fullName || '');
    setEditing(false);
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setSaving(true);
    try {
      await submissionService.updateProfile({ fullName: fullName.trim() });
      updateUser({ fullName: fullName.trim() });
      setProfile({ ...profile, fullName: fullName.trim() });
      setEditing(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#58a6ff]"></div>
      </div>
    );
  }

  const avatarLetter = (profile?.fullName || profile?.username || 'U')[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#e6edf3]">Profile</h1>
          <p className="text-[#8b949e] text-sm mt-1">Manage your account information</p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1c2128] to-[#161b22] px-6 py-8 border-b border-[#30363d]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#7c3aed] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {avatarLetter}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#e6edf3]">
                  {profile?.fullName || profile?.username}
                </h2>
                <p className="text-[#8b949e] text-sm">@{profile?.username}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="w-3 h-3 text-[#3fb950]" />
                  <span className="text-[#3fb950] text-xs font-medium">{profile?.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="p-6 space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                Full Name
              </label>
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 bg-[#0d1117] border border-[#58a6ff] rounded-lg px-3 py-2 text-[#e6edf3] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') handleCancel();
                    }}
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1 px-3 py-2 bg-[#3fb950] hover:bg-green-400 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] rounded-lg text-sm font-medium transition-colors border border-[#30363d]"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-[#e6edf3]">
                    <User className="w-4 h-4 text-[#8b949e]" />
                    <span className="text-sm">{profile?.fullName || 'Not set'}</span>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] rounded-md transition-colors text-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-[#30363d]"></div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-2 text-[#e6edf3]">
                <Mail className="w-4 h-4 text-[#8b949e]" />
                <span className="text-sm">{profile?.email}</span>
                <span className="ml-auto text-xs text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded">
                  Cannot change
                </span>
              </div>
            </div>

            <div className="border-t border-[#30363d]"></div>

            {/* Member Since */}
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                Member Since
              </label>
              <div className="flex items-center gap-2 text-[#e6edf3]">
                <Calendar className="w-4 h-4 text-[#8b949e]" />
                <span className="text-sm">
                  {profile?.memberSince
                    ? new Date(profile.memberSince).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })
                    : 'N/A'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;