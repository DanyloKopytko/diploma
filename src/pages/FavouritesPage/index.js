import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import PointCard from '../../components/PointCard'
import SideAdsFilter from '../../components/SideAdsFilter'
import requester from '../../factories'
import { modifyStringWithQueryParams } from '../../factories/location'

import './index.css'

const FavouritesPage = () => {
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.86) / 300, 10) * 4

  const fetchPoints = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(`${process.env.REACT_APP_API_BACKEND_URL}/points/favourites?limit=${limit}&offset=0`),
    )

    setLoading(false)
    setPoints(data)
  }

  const loadMore = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(
        `${process.env.REACT_APP_API_BACKEND_URL}/points/favourites?limit=${limit}&offset=${points.length}`,
      ),
    )

    setLoading(false)
    setPoints([...points, ...data])
  }

  useEffect(() => {
    const backgroundImage = require('../../assets/images/favourites-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    fetchPoints()
    // eslint-disable-next-line
  }, [limit])

  const unlikeHouse = (id) => {
    setPoints(points.filter((point) => point.id !== id))
  }

  return (
    <div className="favourites-main">
      <SideAdsFilter handleSearch={fetchPoints} />
      <h2>Favourites</h2>
      <div className="favourites-main-cards">
        {points.length || !loading ? (
          <>
            {points.map((point) => (
              <PointCard key={point.id} {...point} unlike={unlikeHouse} />
            ))}
          </>
        ) : (
          <Spin size="large" />
        )}
        {points.length ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default FavouritesPage
