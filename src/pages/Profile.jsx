export default function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>
      
      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">John Doe</h2>
            <p className="text-slate-600">john.doe@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t border-slate-200 pt-4">
            <h3 className="font-bold text-slate-900 mb-2">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4 text-slate-600">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Level:</strong> Intermediate</p>
              <p><strong>Member Since:</strong> Jan 2024</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h3 className="font-bold text-slate-900 mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition duration-200">
                Edit Profile
              </button>
              <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 px-4 py-2 rounded transition duration-200">
                Change Password
              </button>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
