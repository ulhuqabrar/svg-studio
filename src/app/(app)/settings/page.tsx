"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const settingsNav = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.email) setEmail(data.user.email);
        if (data.profile?.display_name) setDisplayName(data.profile.display_name);
      })
      .catch(() => {});
  }, []);

  async function handleSaveProfile() {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: displayName }),
      });
      if (res.ok) {
        setSaveMessage("Profile saved");
        setTimeout(() => setSaveMessage(null), 2000);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-6">
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        {/* Nav */}
        <nav className="space-y-0.5">
          {settingsNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-6">
          {activeTab === "profile" && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-semibold text-foreground">
                Profile
              </h2>
              <div className="space-y-4 max-w-[400px]">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Name</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your display name"
                    className="h-10 text-[14px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Email</Label>
                  <Input
                    value={email}
                    className="h-10 text-[14px]"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="h-9 text-[13px] font-medium"
                    onClick={handleSaveProfile}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  {saveMessage && (
                    <span className="text-[12px] text-green-600">{saveMessage}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-semibold text-foreground">
                Preferences
              </h2>
              <div className="space-y-4 max-w-[400px]">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Default export format</Label>
                  <select className="w-full h-10 px-3 text-[14px] bg-background border border-border rounded-xl outline-none">
                    <option>SVG</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Default style</Label>
                  <select className="w-full h-10 px-3 text-[14px] bg-background border border-border rounded-xl outline-none">
                    <option>Minimal Outline</option>
                    <option>Rounded</option>
                    <option>Bold</option>
                  </select>
                </div>
                <Button className="h-9 text-[13px] font-medium">
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-semibold text-foreground">
                Appearance
              </h2>
              <p className="text-[13px] text-muted-foreground">
                Theme settings coming soon.
              </p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-semibold text-foreground">
                Notifications
              </h2>
              <p className="text-[13px] text-muted-foreground">
                Notification preferences coming soon.
              </p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-semibold text-foreground">
                Security
              </h2>
              <div className="space-y-4 max-w-[400px]">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Change password</Label>
                  <Input type="password" placeholder="Current password" className="h-10 text-[14px]" />
                  <Input type="password" placeholder="New password" className="h-10 text-[14px]" />
                </div>
                <Button className="h-9 text-[13px] font-medium">
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
