import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User as UserIcon, Save, Loader2 } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/users';
import { staggerContainer, staggerItem } from '../lib/animations';
import { COUNTRIES } from '../constants/countries';

const AccountSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const { profile } = useAuth();

    const [name, setName] = useState(profile?.name ?? '');
    const [phone, setPhone] = useState(profile?.phone ?? '');
    const [country, setCountry] = useState(profile?.country ?? '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!profile) return;
        setSaving(true);
        setError(null);
        setSuccess(false);
        try {
            await updateUserProfile(profile.id, {
                name: name.trim(),
                phone: phone.trim() || null,
                country: country.trim() || null,
            });
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageLayout>
            <div className="min-h-screen relative flex flex-col w-full text-white">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 p-4 md:p-8 flex flex-col gap-6 max-w-xl mx-auto min-h-screen w-full"
                >
                    {/* HERO */}
                    <motion.div variants={staggerItem}>
                        <div className="flex flex-col items-center justify-center py-8 relative">
                            <button
                                onClick={() => navigate(-1)}
                                className="absolute top-0 left-0 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors rounded-full flex items-center justify-center border border-white/10"
                            >
                                <ChevronLeft size={20} className="text-white" strokeWidth={3} />
                            </button>

                            <div className="relative z-10 w-20 h-20 mb-4 rounded-full overflow-hidden bg-[#141414]/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt={profile.name}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon size={36} className="text-white/40" />
                                )}
                            </div>

                            <h2 className="relative z-10 font-black text-3xl md:text-4xl text-white text-center tracking-tight uppercase">
                                Account Settings
                            </h2>

                            <p className="relative z-10 text-xs text-white/50 font-data mt-2 uppercase tracking-widest">
                                Update your profile details
                            </p>
                        </div>
                    </motion.div>

                    {/* FORM */}
                    <motion.div variants={staggerItem} className="bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 flex flex-col gap-5 shadow-2xl">
                        <div>
                            <label className="text-[10px] font-black font-data uppercase tracking-widest text-white/50">
                                Email
                            </label>
                            <div className="mt-2 px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-white/50 cursor-not-allowed">
                                {profile?.email}
                            </div>
                            <p className="text-[10px] text-white/30 mt-1.5 uppercase font-bold tracking-wider">Email cannot be changed</p>
                        </div>

                        <div>
                            <label className="text-[10px] font-black font-data uppercase tracking-widest text-white/50">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm font-bold text-white outline-none focus:border-[#FF7A1A] transition-colors placeholder:text-white/20"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black font-data uppercase tracking-widest text-white/50">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={phone ?? ''}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm font-bold text-white outline-none focus:border-[#FF7A1A] transition-colors placeholder:text-white/20"
                                placeholder="Add a phone number"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black font-data uppercase tracking-widest text-white/50">
                                Country
                            </label>
                            <select
                                value={country ?? ''}
                                onChange={(e) => setCountry(e.target.value)}
                                className="mt-2 w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm font-bold text-white outline-none focus:border-[#FF7A1A] transition-colors appearance-none [&>option]:bg-[#1A1A1A] [&>option]:text-white"
                            >
                                <option value="">Select a country</option>
                                {COUNTRIES.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg mt-2">
                                <p className="text-xs font-bold text-red-400">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg mt-2">
                                <p className="text-xs font-bold text-green-400">Profile updated successfully</p>
                            </div>
                        )}

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full flex items-center justify-center gap-2 p-4 bg-[#FF7A1A] hover:bg-[#FF7A1A]/90 transition-colors rounded-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,122,26,0.3)]"
                        >
                            {saving ? (
                                <Loader2 size={18} className="animate-spin text-[#141414]" />
                            ) : (
                                <Save size={18} className="text-[#141414]" strokeWidth={2.5} />
                            )}
                            <span className="font-black uppercase text-sm tracking-wide text-[#141414]">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </PageLayout>
    );
};

export default AccountSettingsPage;