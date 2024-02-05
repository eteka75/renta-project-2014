import React from 'react'

export default function DashMain({ children, ...props }) {
  return (
    <div className="col-span-8 min-h-[50vh] sm:col-span-7 lg:lg:col-span-8 ">
      <div className="pb-8 pt-1">
        <div className="flex-grow text-gray-800"></div>
        <main {...props} className="px-4 sm:px-4 space-y-1">
          {children}
        </main>
      </div>
    </div>
  )
}
