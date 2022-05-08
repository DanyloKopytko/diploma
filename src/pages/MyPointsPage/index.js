import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

import PointCard from '../../components/PointCard'
import SideAdsFilter from '../../components/SideAdsFilter'
import requester from '../../factories'
import { modifyStringWithQueryParams } from '../../factories/location'

import './index.css'

const MyPointsPage = () => {
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.94) / 300, 10) * 4

  const fetchPoints = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(`${process.env.REACT_APP_API_BACKEND_URL}/points/my-points?limit=${limit}&offset=0`),
    )

    setPoints(data)
    setLoading(false)
  }

  const loadMore = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(
        `${process.env.REACT_APP_API_BACKEND_URL}/points/my-points?limit=${limit}&offset=${points.length}`,
      ),
    )

    setPoints([...points, ...data])
    setLoading(false)
  }

  useEffect(() => {
    const backgroundImage = require('../../assets/images/default-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    fetchPoints()
    // eslint-disable-next-line
  }, [limit])

  return (
    <div className="my-ads-main">
      <SideAdsFilter handleSearch={fetchPoints} />
      <h2>Your Points</h2>
      <div className="my-ads-main-cards">
        {points.length || !loading ? (
          <>
            {points.map((house) => (
              <PointCard key={house.id} {...house} isOwner />
            ))}
          </>
        ) : (
          <Spin size="large" />
        )}
        {points.length && (
          <>
            {!loading ? (
              <div className="load-more">
                <div className="load-more-btn" onClick={loadMore}>
                  <p>Load more...</p>
                </div>
              </div>
            ) : (
              <Spin size="large" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyPointsPage
