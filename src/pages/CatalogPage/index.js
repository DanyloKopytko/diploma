import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'

import PointCard from '../../components/PointCard'
import SideAdsFilter from '../../components/SideAdsFilter'
import requester from '../../factories'
import { modifyStringWithQueryParams } from '../../factories/location'

import './index.css'

const CatalogPage = () => {
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(false)

  const limit = parseInt((window.innerWidth * 0.94) / 300, 10) * 4

  const fetchPoint = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(`${process.env.REACT_APP_API_BACKEND_URL}/points?limit=${limit}&offset=0`),
    )

    setLoading(false)
    setPoints(data)
  }

  const loadMore = async () => {
    setLoading(true)

    const data = await requester(
      `GET`,
      modifyStringWithQueryParams(
        `${process.env.REACT_APP_API_BACKEND_URL}/points?limit=${limit}&offset=${points.length}`,
      ),
    )

    setLoading(false)
    setPoints([...points, ...data])
  }

  useEffect(() => {
    const backgroundImage = require('../../assets/images/catalog-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    fetchPoint()
    // eslint-disable-next-line
  }, [limit])

  return (
    <div className="catalog-main">
      <SideAdsFilter handleSearch={fetchPoint} />
      <h2>Catalog</h2>
      <div className="catalog-main-cards">
        {points.length || !loading ? (
          <>
            {points.map((point) => (
              <PointCard key={point.id} {...point} />
            ))}
          </>
        ) : (
          <Spin size="large" />
        )}
        {points.length > 0 && (
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

export default CatalogPage
