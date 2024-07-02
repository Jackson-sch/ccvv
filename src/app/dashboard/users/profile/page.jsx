import React from 'react'

export default function page() {
  return (
    <div className="max-w-xs mx-auto bg-gradient-to-b from-purple-400 to-purple-900 rounded-xl overflow-hidden shadow-lg text-white">
    <div className="p-4">
      <div className="flex justify-end">
        <button className="bg-gray-800 px-2 py-1 rounded text-xs">Edit Profile</button>
      </div>
      <div className="text-center mt-4">
        <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-gray-800">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <h2 className="mt-4 text-xl font-bold">Tony Reichert</h2>
        <p className="text-sm text-gray-400">@tony.reichert</p>
        <div className="flex justify-center mt-4">
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs mr-2">Design</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs mr-2">UI/UX</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">Photography</span>
        </div>
        <p className="mt-4 text-sm">Creator of Radify Icons Set. 500+ icons in 6 styles, SVG and Figma files, and more.</p>
        <div className="flex justify-between mt-4 text-sm">
          <span>13 Following</span>
          <span>2500 Followers</span>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 px-4 py-2">
      <div className="flex justify-around">
        <button className="bg-gray-800 px-4 py-1 rounded-full">Posts</button>
        <button className="bg-gray-800 px-4 py-1 rounded-full">Likes</button>
        <button className="bg-gray-800 px-4 py-1 rounded-full border-2 border-gray-500">Media</button>
      </div>
    </div>
    <div className="p-4">
      <div className="bg-gray-800 rounded-lg p-4 mt-4">
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
        <div className="flex justify-between mt-4 text-xs text-gray-400">
          <span>123 Likes</span>
          <span>12 Comments</span>
        </div>
      </div>
    </div>
  </div>
  )
}
