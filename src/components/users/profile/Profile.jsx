import React from 'react'

export default function Profile() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
  <div className="flex items-center mb-6">
    <img src="path_to_image.jpg" alt="Profile picture" className="w-24 h-24 rounded-lg mr-4" />
    <div>
      <h2 className="text-2xl font-bold">Victor James</h2>
      <p className="text-gray-500">Main Admin</p>
      <p className="text-indigo-600">Adlash IT Solution</p>
    </div>
  </div>

  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold">Personal Information</h3>
      <button className="text-blue-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit
      </button>
    </div>

    {[
      { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "johnathon23@gmail.com" },
      { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Phone No", value: "+1-321-456-8756" },
      { icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", label: "Website", value: "Victorjames.com" },
      { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Annual Revenue", value: "$ 24000 USD" },
    ].map((item, index) => (
      <div key={index} className="flex items-center mb-3">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{item.label}</p>
          <p className="font-medium">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}
