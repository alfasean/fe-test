import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ButtonComponent from '../../Components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

function TextControlsExample() {
  const [formData, setFormData] = useState({
    nama_pengirim: '',
    alamat_pengirim: '',
    nama_penerima: '',
    alamat_penerima: '',
    ekspedisi_id: '',
    status: 'Dikirim'
  });

  const [expeditions, setExpeditions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await axios.get('https://gapura-server.vercel.app/expeditions');
        setExpeditions(response.data);
      } catch (error) {
        console.error('Error fetching expeditions:', error.message);
      }
    };
  
    fetchExpeditions();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gapura-server.vercel.app/packages', formData);
      if (response.status === 200) {
        console.log('Success:', response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Data berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/', { state: { formData } });
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form className='container mt-5' onSubmit={handleSubmit}>
      <h2>Form Pengiriman</h2>
      <Form.Group className="mb-3" controlId="formNamaPengirim">
        <Form.Label>Nama Pengirim</Form.Label>
        <Form.Control
          type="text"
          name="nama_pengirim"
          value={formData.nama_pengirim}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAlamatPengirim">
        <Form.Label>Alamat Pengirim</Form.Label>
        <Form.Control
          type="text"
          name="alamat_pengirim"
          value={formData.alamat_pengirim}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNamaPenerima">
        <Form.Label>Nama Penerima</Form.Label>
        <Form.Control
          type="text"
          name="nama_penerima"
          value={formData.nama_penerima}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAlamatPenerima">
        <Form.Label>Alamat Penerima</Form.Label>
        <Form.Control
          type="text"
          name="alamat_penerima"
          value={formData.alamat_penerima}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEkspedisi">
        <Form.Label>Ekspedisi</Form.Label>
        <Form.Control
          as="select"
          name="ekspedisi_id"
          value={formData.ekspedisi_id}
          onChange={handleChange}
        >
          <option value="">Pilih Ekspedisi</option>
          {expeditions.map((expedition) => (
            <option key={expedition.id} value={expedition.id}>
              {expedition.nama}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <ButtonComponent name='Kembali' variant="primary" href='/'/>
      <ButtonComponent variant="success" type="submit" name="Submit"/>
    </Form>
  );
}

export default TextControlsExample;
