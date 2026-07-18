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
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="p-4 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto"
            >
                {/* HERO: same poster treatment as Profile page */}
                <motion.div variants={staggerItem}>
                    <div className="poster-block torn-bottom flex flex-col items-center justify-center py-12 px-4 relative">
                        <div className="halftone" />
                        <div className="poster-orb w-64 h-64 -top-10 -left-10 opacity-60" />

                        <button
                            onClick={() => navigate(-1)}
                            className="absolute top-4 left-4 z-20 neu-puck w-10 h-10 bg-white flex items-center justify-center"
                        >
                            <ChevronLeft size={20} className="text-(--ink)" strokeWidth={3} />
                        </button>

                        <div className="relative z-10 w-20 h-20 mb-4 rounded-full overflow-hidden bg-white flex items-center justify-center">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserIcon size={36} className="text-black/40" />
                            )}
                        </div>

                        <h2 className="relative z-10 poster-type text-3xl md:text-4xl text-(--bone) text-center">
                            Account Settings
                        </h2>

                        <p className="relative z-10 text-xs text-(--bone)/70 font-data mt-1">
                            Update your profile details
                        </p>
                    </div>
                </motion.div>

                {/* FORM: Neumorphic panel, editable fields */}
                <motion.div variants={staggerItem} className="neu-panel bg-white p-6 flex flex-col gap-5">
                    <div>
                        <label className="text-[10px] font-black font-data uppercase tracking-widest text-(--ink)/50">
                            Email
                        </label>
                        <div className="mt-2 px-4 py-3 rounded-xl bg-(--neu-bg) text-sm font-bold text-(--ink)/50">
                            {profile?.email}
                        </div>
                        <p className="text-[10px] text-(--ink)/40 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                        <label className="text-[10px] font-black font-data uppercase tracking-widest text-(--ink)/50">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-xl bg-(--neu-bg) text-sm font-bold text-(--ink) outline-none focus:ring-2 focus:ring-(--neu-blue)"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black font-data uppercase tracking-widest text-(--ink)/50">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={phone ?? ''}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-xl bg-(--neu-bg) text-sm font-bold text-(--ink) outline-none focus:ring-2 focus:ring-(--neu-blue)"
                            placeholder="Add a phone number"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black font-data uppercase tracking-widest text-(--ink)/50">
                            Country
                        </label>
                        <select
                            value={country ?? ''}
                            onChange={(e) => setCountry(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-xl bg-(--neu-bg) text-sm font-bold text-(--ink) outline-none focus:ring-2 focus:ring-(--neu-blue) appearance-none"
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
                        <p className="text-xs font-bold text-(--neu-coral)">{error}</p>
                    )}
                    {success && (
                        <p className="text-xs font-bold text-(--neu-blue)">Profile updated successfully</p>
                    )}

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="neu-panel w-full flex items-center justify-center gap-2 p-4 bg-(--neu-blue) mt-2 disabled:opacity-60"
                    >
                        {saving ? (
                            <Loader2 size={18} className="animate-spin text-white" />
                        ) : (
                            <Save size={18} className="text-white" strokeWidth={2.5} />
                        )}
                        <span className="font-black uppercase text-sm tracking-wide text-white">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </PageLayout>
    );
};

export default AccountSettingsPage;