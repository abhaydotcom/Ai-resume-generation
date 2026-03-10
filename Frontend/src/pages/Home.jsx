import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const InfoCard = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1.5 p-4 bg-white border border-gray-100 rounded-xl">
    <div className="text-base">{icon}</div>
    <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">{label}</div>
    <div className={`text-sm ${!value ? "text-gray-300 italic" : "text-gray-800"}`}>
      {value || "Not provided"}
    </div>
  </div>
);

export default function Home() {
  const { user, logout } = useAuth();
  console.log(user)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900 tracking-tight">AuthFlow</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Hey, {user?.name?.split(" ")[0]} 👋</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 bg-white transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 pt-10 pb-16">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Your <span className="text-gray-400">Profile</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">All your account details in one place</p>
        </div>

        <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Active Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoCard icon="✦" label="Full Name" value={user?.name} />
          <InfoCard icon="✉" label="Email" value={user?.email} />
          <InfoCard icon="📱" label="Phone" value={user?.phone} />
          <InfoCard icon="🗓" label="Member Since" value={joined} />
          {user?.bio && (
            <div className="col-span-2 flex flex-col gap-1.5 p-4 bg-white border border-gray-100 rounded-xl">
              <div className="text-base">✍</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">Bio</div>
              <div className="text-sm text-gray-800">{user.bio}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}