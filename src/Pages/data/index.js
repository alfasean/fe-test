import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './style.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../Components/Button';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function DataPage() {
  const [packages, setPackages] = useState([]);
  const [expeditions, setExpeditions] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://gapura-server.vercel.app/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error.message);
      }
    };

    const fetchExpeditions = async () => {
      try {
        const response = await axios.get('https://gapura-server.vercel.app/expeditions');
        setExpeditions(response.data);
      } catch (error) {
        console.error('Error fetching expeditions:', error.message);
      }
    };

    fetchPackages();
    fetchExpeditions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menghapus paket ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      });
      
      if (result.isConfirmed) {
        await axios.delete(`https://gapura-server.vercel.app/packages/${id}`);
        const updatedPackages = packages.filter(pkg => pkg.id !== id);
        setPackages(updatedPackages);
        Swal.fire('Sukses', 'Paket berhasil dihapus', 'success');
      }
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const getExpeditionName = (id) => {
    const expedition = expeditions.find(exp => exp.id === id);
    return expedition ? expedition.nama : 'Unknown';
  };

  return (
    <div className='container mt-5'>
      <h2>Data Semua Paket</h2>
      <ButtonComponent className='mb-3' variant='success' href='/input-data' name='Input Pengiriman'/>
      <ButtonComponent className='mb-3' variant='warning' href='/reports-data' name='Laporan'/>
      {packages.length > 0 ? (
        <Table  striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pengirim</th>
              <th>Alamat Pengirim</th>
              <th>Nama Penerima</th>
              <th>Alamat Penerima</th>
              <th>Ekspedisi</th>
              <th>Tanggal Pembuatan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={pkg.id}>
                <td>{index + 1}</td>
                <td>{pkg.nama_pengirim}</td>
                <td>{pkg.alamat_pengirim}</td>
                <td>{pkg.nama_penerima}</td>
                <td>{pkg.alamat_penerima}</td>
                <td>{getExpeditionName(pkg.ekspedisi_id)}</td>
                <td>{pkg.tanggal_pembuatan}</td>
                <td>{pkg.status}</td>
                <td>
                  <Link to={`/edit-data/${pkg.id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ color: '#17a2b8', cursor: 'pointer', marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(pkg.id)} style={{ color: '#C40C0C', cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Tidak ada data yang tersedia.</p>
      )}
    </div>
  );
}

export default DataPage;
