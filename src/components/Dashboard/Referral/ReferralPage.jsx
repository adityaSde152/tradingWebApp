import React, { useState } from "react";
import { Copy, Share2, Users, Gift, BarChart2 } from "lucide-react";

// Referral Program Page (single-file React component)
// Uses Tailwind CSS classes for styling. Expects tailwind to be configured in the project.
// Default export: ReferralPage

export default function ReferralPage({ user = {} }) {
  // user prop can include: { id, name, referralCode, referralsCount, earned }
  const defaultUser = {
    id: "u_123456",
    name: "Trader",
    referralCode: user.referralCode || "ABC123",
    referralsCount: user.referralsCount || 3,
    earned: user.earned || 42.5,
  };

  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://example.com"}/signup?ref=${defaultUser.referralCode}`;

  const tiers = [
    {
      id: 1,
      name: "Bronze",
      requirement: "1+ referrals",
      reward: "$5 per referral",
    },
    {
      id: 2,
      name: "Silver",
      requirement: "5+ referrals",
      reward: "$7 per referral",
    },
    {
      id: 3,
      name: "Gold",
      requirement: "15+ referrals",
      reward: "$10 per referral + priority support",
    },
  ];

  const recentReferrals = [
    { id: "r1", name: "Aman K.", email: "aman@example.com", date: "2025-09-12", status: "Converted", reward: 5 },
    { id: "r2", name: "Priya S.", email: "priya@example.com", date: "2025-08-23", status: "Converted", reward: 5 },
    { id: "r3", name: "Dev R.", email: "dev@example.com", date: "2025-07-11", status: "Pending", reward: 0 },
  ];

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // fallback
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    }
  }

  function handleShare(platform) {
    const text = encodeURIComponent(`Join ${defaultUser.name} on CryptoTrade — sign up and trade. Use my referral: ${referralLink}`);
    const url = encodeURIComponent(referralLink);

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
        break;
      case "mail":
        window.open(`mailto:?subject=${encodeURIComponent("Join CryptoTrade")}&body=${text}`);
        break;
      default:
        window.open(referralLink, "_blank");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <p className="text-sm text-slate-500 mt-1">Invite friends, earn trading credits and climb the referral tiers.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-md text-sm">
            <div className="font-medium">Your code</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-lg font-semibold">{defaultUser.referralCode}</div>
              <button
                onClick={handleCopy}
                className="ml-2 inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm border hover:bg-slate-100"
                aria-label="Copy referral link"
              >
                <Copy size={16} />
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-500">Referrals</div>
            <div className="font-semibold text-lg">{defaultUser.referralsCount}</div>
            <div className="text-xs text-slate-400">Earned: ${defaultUser.earned}</div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: How it works + Share */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">How it works</h2>
              <p className="text-sm text-slate-500 mt-1">Share your unique referral link. When someone signs up and completes qualifying trades, you get rewarded.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleShare('twitter')} className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50">
                <Share2 size={16} /> Share
              </button>
              <button onClick={() => handleShare('mail')} className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m-4 4l4 4" />
                </svg>
                Email
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Users size={18} />
                <div>
                  <div className="text-sm text-slate-500">Total invites</div>
                  <div className="font-semibold">{defaultUser.referralsCount}</div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Gift size={18} />
                <div>
                  <div className="text-sm text-slate-500">Rewards earned</div>
                  <div className="font-semibold">${defaultUser.earned}</div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart2 size={18} />
                <div>
                  <div className="text-sm text-slate-500">Conversion rate</div>
                  <div className="font-semibold">{Math.round((defaultUser.referralsCount / 10) * 100)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Invite link box */}
          <div className="mt-6">
            <label className="text-sm text-slate-600">Your invite link</label>
            <div className="mt-2 flex gap-2 items-center">
              <input readOnly value={referralLink} className="flex-1 px-3 py-2 border rounded-md bg-slate-50" />
              <button onClick={handleCopy} className="px-4 py-2 rounded-md border inline-flex items-center gap-2">
                <Copy size={16} /> {copied ? "Copied" : "Copy"}
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => handleShare('telegram')} className="px-3 py-2 rounded-md border">Telegram</button>
                <button onClick={() => handleShare('twitter')} className="px-3 py-2 rounded-md border">Twitter</button>
              </div>
            </div>
          </div>

          {/* Recent referrals table */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-3">Recent referrals</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-500 text-left">
                  <tr>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReferrals.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="py-3">{r.name}</td>
                      <td className="py-3 text-slate-500">{r.email}</td>
                      <td className="py-3 text-slate-500">{r.date}</td>
                      <td className="py-3">{r.status}</td>
                      <td className="py-3 text-right">{r.reward ? `$${r.reward}` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Tiers & FAQ */}
        <aside className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">Referral tiers</h3>
            <div className="space-y-3">
              {tiers.map((t) => (
                <div key={t.id} className={`p-3 rounded-lg border ${selectedTier === t.id ? "bg-slate-50 border-slate-200" : "bg-white"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.requirement}</div>
                    </div>
                    <div className="text-sm font-semibold">{t.reward}</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{t.description}</div>
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => setSelectedTier(t.id)}
                      className="px-3 py-1 rounded-md border text-sm"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">FAQ</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <div className="font-medium">When do I get my rewards?</div>
                <div className="mt-1 text-xs">Rewards are credited after the referred user completes the qualifying trades (see terms).</div>
              </div>
              <div>
                <div className="font-medium">Is there a limit?</div>
                <div className="mt-1 text-xs">No limit — the more people you bring, the more you can earn. Tiers increase your per-referral reward.</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white rounded-2xl p-6">
            <h4 className="text-sm font-semibold">Need help?</h4>
            <p className="text-xs mt-2">Contact our support team for questions about tracking or payments.</p>
            <div className="mt-4">
              <a href="/support" className="inline-block px-4 py-2 rounded-md bg-white text-slate-900 font-medium">Contact support</a>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Ready to get more referrals?</h3>
          <p className="text-sm text-slate-500">Share your link — earn credits and unlock higher tiers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleShare('twitter')} className="px-4 py-2 rounded-md border">Share on Twitter</button>
          <button onClick={() => handleCopy} className="px-4 py-2 rounded-md border">Copy Link</button>
        </div>
      </div>
    </div>
  );
}
