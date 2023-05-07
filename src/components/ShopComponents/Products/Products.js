import React, { useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { FiDelete, FiEdit2, FiTrash } from "react-icons/fi";
import { AddProduct } from "../../Modals/LocalAdmin/product/AddProduct";
import { Loading } from "../../Loading/Loading";
import { NoData } from "../../AuxiliarViews/NoData";
import { formatter } from "../../../common/utils/FormattPrice";
import { EditProduct } from "../../Modals/LocalAdmin/product/EditProduct";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'
import { modalError } from "../../SweetAlert/Error";
import { modalSucces } from "../../SweetAlert/Success";
import Api from "../../../common/Api/Api";
import { useMutation } from "react-query";
const { confirm } = Modal;


export const Products = ({ data, isLoading }) => {
  const [visible, setVisible] = useState(false)
  const [visibleProduct, setvisibleProduct] = useState(false)
  const [product, setproduct] = useState()

  //muestra ventana de confirmación,si se confirma activa la peticion post

  function showConfirm(data) {
    confirm({
      title: '¿Esta seguro que desea eliminar este producto?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        mutation.mutate({ "idproduct": data?.IdProduct })
      }
    });
  }
  const handleEdit = (product) => {
    setvisibleProduct(!visibleProduct)
    setproduct(product)
  }

  // peticion post para eliminar productos

  const mutation = useMutation(data => {
    return Api.post('/products/RemoveProduct', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {
        modalError({ message: data?.payload.Message ? data?.payload.Message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "El producto se ha eliminado con exito", reload: true, title: 'Eliminado' });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })


  return (
    <>
      {Array.isArray(data?.payload) ?
        <div className="products">
          {data?.payload.map((item) => (
            <div className="products_item">
              <div className="description">
                <span>{item.NameProduct} </span>
                <p> {formatter.format(item.UnitValue)} </p>
              </div>
              <div className="actions cursor-pointer">
                <div onClick={() => handleEdit(item)} className="edit cursor-pointer">
                  <FiEdit2 />
                </div>
                <div onClick={() => showConfirm(item)} className="delete cursor-pointer">
                  <FiTrash />
                </div>
              </div>
            </div>
          ))}
          <div onClick={() => setVisible(!visible)} className="plus cursor-pointer">
            <AiOutlinePlus />
          </div>
        </div> : <div><NoData /></div>
      }
      <AddProduct visible={visible} setVisible={setVisible} />
      <EditProduct product={product && product} visible={visibleProduct} setVisible={setvisibleProduct} />
      <Loading visible={isLoading || mutation.isLoading} />
    </>
  );
};
