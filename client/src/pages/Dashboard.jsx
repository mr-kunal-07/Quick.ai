import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkle } from 'lucide-react'
import CreationItem from '../components/CreationItem'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const Dashboard = () => {

  const [creations, setCreations] = useState([])

  const [loading, setLoading] = useState(true)

  const { getToken } = useAuth()


  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
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

  useEffect(() => {
    getDashboardData()
  }, [])


  const { has } = useAuth()
  const hasPlan = has({ plan: 'premium' })

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total creation Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className='text-sm'>Total creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkle className='w-5 text-white' />
          </div>

        </div>

        {/* Active plan  Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className='text-sm'>Active plan</p>
            <h2 className="text-xl font-semibold">
              {hasPlan ? 'Premium' : 'Free'}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className='w-5 text-white' />
          </div>

        </div>
      </div>

      {
        loading ? (
          <div className='flex justify-center items-center h-3/4'>
            <div className="w-10 h-10 rounded-full my-1 border-3 border-primary border-t-transparent animate-spin">

            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className='mt-6 mb-4'>Recent creations</p>
            {
              creations.map((item) => <CreationItem key={item.id} item={item} />)
            }
          </div>
        )
      }

    </div >
  )
}

export default Dashboard