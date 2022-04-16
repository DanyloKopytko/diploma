import React, { useState, useEffect } from 'react'
import { Drawer, Form, Input, Button, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import { adsFiltersNames } from '../../configs/globals'

import './index.css'

const { Option } = Select

const SideAdsFilter = ({ handleSearch }) => {
  const history = useHistory()
  const [form] = Form.useForm()

  const [isOpenedDrawer, setOpenDrawer] = useState(false)
  const [filterObject, setFilterObject] = useState()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const tempFilter = {}

    adsFiltersNames.forEach((filter) => {
      const value = params.get(filter)

      if (filter === 'type') tempFilter[filter] = value?.split(',')[0] ? value.split(',') : []
      else if (value) tempFilter[filter] = value
    })

    setFilterObject(tempFilter)
  }, [])

  const handleFormChange = () => {
    const values = form.getFieldsValue()
    let queries = '?'

    Object.keys(values).forEach((key) => {
      if (key === 'type' && !values[key][0]) return
      if (values[key]) queries += `${key}=${values[key]}&`
    })

    history.push(queries)
  }

  const handleOnClick = () => {
    handleSearch()
    setOpenDrawer(false)
  }

  return (
    <>
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="double-right"
        width="2.5em"
        height="2.5em"
        fill="currentColor"
        aria-hidden="true"
        onClick={setOpenDrawer}
        className="double-right-svg"
      >
        <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" />
      </svg>
      <Drawer
        title="Filters"
        placement="left"
        width={window.innerWidth <= 900 ? '100%' : '20%'}
        closable
        onClose={() => setOpenDrawer(false)}
        visible={isOpenedDrawer}
        className="side-filter"
      >
        <Form form={form} onValuesChange={handleFormChange} initialValues={filterObject} name="basic">
          <Form.Item name="city">
            <Input placeholder="City" allowClear />
          </Form.Item>
          <Form.Item name="district">
            <Input placeholder="District" allowClear />
          </Form.Item>
          <Form.Item name="type">
            <Select mode="multiple" allowClear placeholder="Point type">
              <Option value="PCR">PCR</Option>
              <Option value="Vaccination">Vaccination</Option>
              <Option value="PCR and Vaccination">PCR and Vaccination</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleOnClick} type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default SideAdsFilter
