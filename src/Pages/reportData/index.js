import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ButtonComponent from '../../Components/Button';

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [expeditions, setExpeditions] = useState([]);
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://gapura-server.vercel.app/reports', { params: { startDate } }); // Menghapus endDate dari params
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error.message);
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

    fetchReports();
    fetchExpeditions();
  }, [startDate]);

  const handleClearFilters = () => {
    setStartDate('');
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  return (
    <div className='container'> 
      <h2 className='my-4'>Reports</h2>
      <Form>
        <Form.Group controlId="startDate">
          <Form.Label>Tanggal Awal</Form.Label>
          <Form.Control 
            type="date" 
            value={startDate} 
            onChange={handleStartDateChange} 
          />
        </Form.Group>
        <ButtonComponent className='my-3' variant="warning" onClick={handleClearFilters} name='Bersihkan Filter'/>
      </Form>
      <Table striped bordered hover variant='dark'>
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
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.nama_pengirim}</td>
              <td>{report.alamat_pengirim}</td>
              <td>{report.nama_penerima}</td>
              <td>{report.alamat_penerima}</td>
              <td>{report.ekspedisi_id}</td>
              <td>{report.tanggal_pembuatan}</td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
        <ButtonComponent className='mt-2' name='Kembali' variant="primary" href='/'/>
      </Table>
    </div>
  );
}

export default ReportsPage;
