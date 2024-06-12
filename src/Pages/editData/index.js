import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ButtonComponent from '../../Components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';


function EditData() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_pengirim: '',
    alamat_pengirim: '',
    nama_penerima: '',
    alamat_penerima: '',
    ekspedisi_id: '',
  });

  const [expeditions, setExpeditions] = useState([]);

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
  
    const fetchPackageById = async () => {
      try {
        const response = await axios.get(`https://gapura-server.vercel.app/packages/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching package:', error.message);
      }
    };
  
    fetchPackageById();
  }, [id]);

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
      await axios.put(`https://gapura-server.vercel.app/packages/${id}`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Data berhasil disimpan',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Error updating package:', error.message);
    }
  };
  

  return (
    <Form className='container' onSubmit={handleSubmit}>
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
    <Form.Group className="mb-3" controlId="formStatus">
    <Form.Label>Status</Form.Label>
    <Form.Control
        as="select"
        name="status"
        value={formData.status}
        onChange={handleChange}
    >
        <option value="Dikirim">Dikirim</option>
        <option value="Dalam Perjalanan">Dalam Perjalanan</option>
        <option value="Tiba di Tujuan">Tiba di Tujuan</option>
    </Form.Control>
    </Form.Group>
    <ButtonComponent className='mb-4' name='Kembali' variant="primary" href='/'/>
      <ButtonComponent className='mb-4' variant="success" type="submit" name="Submit"/>
    </Form>
  );
}

export default EditData;
