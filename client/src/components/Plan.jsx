import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plan = () => {
  return (
    <div className="relative py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Plan
          </span>
        </h2>
        <p className="mt-3 text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-10">
          <PricingTable />
        </div>
      </div>
    </div>
  )
}

export default Plan
