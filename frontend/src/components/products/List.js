import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ArrowCounterclockwise, PencilSquare, Trash } from 'react-bootstrap-icons';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import ProductForm from './Form';

export default function List() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      const { data: { data } } = await axios.get("/api/products", { signal: controller.signal });
      setProducts(data);
    }
    run();
    return () => {
      controller.abort();
    }
  }, [refresh]);

  const deleteProduct = useCallback(async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      toggleRefresh();
    } catch (e) {
      console.log(e);
    }
  }, [refresh]);

  const recoverProduct = useCallback(async (productId) => {
    try {
      await axios.put(`/api/products/${productId}/recover`);
      toggleRefresh();
    } catch (e) {
      console.log(e);
    }
  }, [refresh]);

  const editProduct = (product) => {
    setModal(true);
    setSelectedProduct(product);
  }

  const onSave = () => { setModal(false); setSelectedProduct(undefined); toggleRefresh(); };
  const onCancel = () => { setModal(false); setSelectedProduct(undefined); toggleRefresh(); };
  return <>
    <div>
      <div>Il y a {products.length} produit{(products.length > 1) ? "s" : ""}.</div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Disponible</th>
            <th>Nombre disponible</th>
            <th>Nombre total</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, i) => {
              const trClass = product.deleted ? 'table-danger' : (i % 2 ? "table-primary" : "table-light");

              return (
                <tr class={trClass}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.has_available_quantity == 1 ? "oui" : "non"}</td>
                  <td>{product.available_quantity}</td>
                  <td>{product.quantity}</td>
                  <td>{product.image_path}</td>
                  <td>
                    <Button onClick={() => editProduct(product)}><PencilSquare /></Button>
                    {
                      product.deleted ?
                        (<Button onClick={() => recoverProduct(product.id)}><ArrowCounterclockwise /></Button>)
                        :
                        (<Button onClick={() => deleteProduct(product.id)}><Trash /></Button>)
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
    {
      selectedProduct ?
        <Modal isOpen={modal} toggle={toggle} fullscreen>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <ProductForm
              product={selectedProduct}
              onSave={onSave}
              onCancel={onCancel}
            />
          </ModalBody>
        </Modal>
        : null
    }
  </>
}