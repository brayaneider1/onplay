import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { RequestLocal } from '../../components/Modals/Owner/RequestLocal'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Loading } from '../../components/Loading/Loading'
import jwt_decode from 'jwt-decode'
import { Token } from '../../common/Storage/Token'
import { NoData } from '../../components/AuxiliarViews/NoData'
import Api from '../../common/Api/Api'
import { AiOutlineMore } from 'react-icons/ai'
import { Popover } from 'antd'
import { EditLocal } from '../../components/Modals/Owner/EditLocal'
import { EditLocalAdomin } from '../../components/Modals/Owner/EditLocalAdmin'

export const Locals = () => {
  const userData = jwt_decode(Token.getToken())
  const [visibleEditLocal, setvisibleEditLocal] = useState(false)
  const [visibleEditAdmin, setvisibleEditAdmin] = useState(false)
  const [dataLocal, setdataLocal] = useState()

  const handleEdit = (data) => {
    console.log('Data', data)
    setvisibleEditLocal(!visibleEditLocal)
    setdataLocal(data)
  }

  const handleEditAdmin = (data) => {
    setvisibleEditAdmin(!visibleEditAdmin)
    setdataLocal(data)
  }
  const handleClose = () => {
    setdataLocal(null)
    setvisibleEditLocal(false)
  }

  const content = (data) => {
    return (
      <div>
        <p
          onClick={() => handleEdit(data)}
          className="cursor-pointer hover:bg-gray-100 "
        >
          Editar local
        </p>
        <p
          onClick={() => handleEditAdmin(data)}
          className="cursor-pointer hover:bg-gray-100"
        >
          Editar datos del administrador
        </p>
      </div>
    )
  }

  const { data, isLoading } = useQuery(
    'locals',
    () =>
      fetch(
        'https://api.onplay.com.co/Local/getLocal/' + userData.data.IdCompany,
        {
          method: 'GET',
        }
      )
        .then(async (response) => {
          return await response.json()
        })
        .catch((err) => {
          console.log(err)
        }),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  )

  const { data: datas } = useQuery(
    'localsLimit',
    () => Api.get('/local/getLocalNumber/' + userData.data.IdCompany),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  )

  const { data: dataCountry } = useQuery('location', () =>
    Api.get('/local/getGeography/' + userData.data.IdCompany)
  )

  const [visible, setvisible] = useState(false)

  const handleData = (data) => {
    localStorage.setItem('nameLocal', data.NameLocal)
  }
  return (
    <>
      {Array.isArray(data) ? (
        <>
          {data.length !== 0 ? (
            <div className="locals">
              {datas?.payload[0].valor > 0 && (
                <div onClick={() => setvisible(true)} className="locals_add">
                  <FiPlus />
                </div>
              )}
              {data.map((i) => (
                <div className="item" key={i.IDLocal}>
                  <Popover
                    placement="bottom"
                    content={content(i)}
                    trigger="click"
                  >
                    <AiOutlineMore />
                  </Popover>

                  <div className="locals_img">
                    {!i ? (
                      <img
                        src={
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/640px-Soccer_ball.svg.png'
                        }
                      />
                    ) : (
                      <img src={i.Logo} />
                    )}
                  </div>
                  <span>{i.NameLocal}</span>
                  <p>
                    Ubicaciòn: {i.Municipality} - {i.Department}
                  </p>

                  <Link
                    onClick={handleData(i)}
                    to={
                      '/scenarios/' +
                      i.IdLocal +
                      '/' +
                      i.NameLocal +
                      '/limit=' +
                      i.NumberFields
                    }
                    className="btn_accent_blue mx-1"
                  >
                    {' '}
                    Abrir
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <>
              {' '}
              <NoData />
              <div onClick={() => setvisible(true)} className="locals_add">
                <FiPlus />
              </div>
            </>
          )}
        </>
      ) : (
        <NoData />
      )}
      <RequestLocal
        data={dataCountry && dataCountry}
        visible={visible}
        setVisible={setvisible}
      />
      <EditLocal
        local={dataLocal}
        visible={visibleEditLocal}
        onClose={handleClose}
      />
      <EditLocalAdomin
        local={dataLocal}
        visible={visibleEditAdmin}
        setVisible={setvisibleEditAdmin}
      />
      <Loading visible={isLoading} />
    </>
  )
}
