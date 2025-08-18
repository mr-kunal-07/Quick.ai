import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Heart } from 'lucide-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [Creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreation = async () => {
    try {
      const { data } = await axios.get('/api/user/get-publish-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      )

      if (data.success) {
        await fetchCreation()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) fetchCreation()
  }, [user])

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Community Creations</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto">
        {Creations.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full py-20">
            🚀 No creations published yet. Be the first to share!
          </p>
        ) : (
          Creations.map((creation, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              {/* Image */}
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-sm text-gray-200 line-clamp-2">
                  {creation.prompt}
                </p>
              </div>

              {/* Likes */}
              <button
                onClick={() => imageLikeToggle(creation.id)}
                className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-md transition-all"
              >
                <Heart
                  className={`h-5 w-5 ${creation.likes.includes(user.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600'
                    }`}
                />
                <span className="text-sm font-medium">
                  {creation.likes.length}
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
    </div>
  )
}

export default Community
