import React, { useCallback, useState } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import axios from 'axios';

export default function ProductForm({ product: {
  id,
  name: _name,
  description: _description,
  price: _price,
  has_available_quantity,
  available_quantity,
  quantity
}, onSave, onCancel }) {
  const [name, setName] = useState(_name);
  const [description, setDescription] = useState(_description);
  const [price, setPrice] = useState(_price);
  const [hasAvailableQty, setHasAvailableQty] = useState(has_available_quantity);
  const [availableQty, setAvailableQty] = useState(available_quantity);
  const [totalQty, setTotalQty] = useState(quantity);

  const saveChanges = useCallback(async () => {
    try {
      const data = {
        name,
        description,
        price,
        has_available_quantity: hasAvailableQty,
        available_quantity: availableQty,
        quantity: totalQty
      };

      if (id) {
        await axios.put(`/api/products/${id}`, data, { headers: {'Content-Type': 'application/json'} });
      } else {
        await axios.post('/api/products', data, { headers: {'Content-Type': 'application/json'} });
      }

      onSave?.();

    } catch (e) {
      console.log(e);
    }
  }, [name, description, price, hasAvailableQty, availableQty, totalQty]);

  const cancelChanges = () => {
    onCancel?.();
  }

  return <Form>
    <FormGroup floating>
      <Input
        id="productName"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <Label for="productName">
        Nom
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="productDescription"
        placeholder=""
        type="textarea"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <Label for="productDescription">
        Description
      </Label>
    </FormGroup>
    <FormGroup>
      <InputGroup>
        <InputGroupText>
          €
        </InputGroupText>
        <Input
          id="productPrice"
          type="number"
          placeholder="username"
          value={price}
          onChange={
            (e) => {
              setPrice(e.target.value)
            }
          }
        />
      </InputGroup>
      <Label for="productPrice">
        Prix
      </Label>
    </FormGroup>
    <FormGroup check>
      <Input
        id="productAvailable"
        name="check"
        type="checkbox"
        value={hasAvailableQty}
        onChange={(e) => {
          setHasAvailableQty(e.target.value)
        }}
      />
      <Label
        check
        for="productAvailable"
      >
        Disponible
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="productAvailableQty"
        type="number"
        value={availableQty}
        onChange={(e) => {
          setAvailableQty(e.target.value)
        }}
      />
      <Label for="productAvailableQty">
        Nombre Disponible
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="productTotalQty"
        type="number"
        value={totalQty}
        onChange={(e) => {
          setTotalQty(e.target.value)
        }}
      />
      <Label for="productTotalQty">
        Nombre Total
      </Label>
    </FormGroup>
    <Button color="primary" onClick={saveChanges}>Sauvegarder</Button>
    <Button color="secondary" onClick={cancelChanges}>Annuler</Button>
  </Form>
}