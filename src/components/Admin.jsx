import { Table } from 'antd';
import { collection, getDocs,deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import db from '../config/Config.js';
import {Spin} from "antd"
function Admin() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsCollection = collection(db, "Contacts");
        const snapshot = await getDocs(contactsCollection);
        const contactList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(contactList);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataSource = data.map((item) => ({
    key: item.id,
    firstname: item.FirstName,
    lastname: item.LastName,
    email: item.Email,
    phone_no: item.PhoneNumber,
    message: item.Query
  }));

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "Contacts", id); // Get reference to the document
      await deleteDoc(docRef); // Delete document from Firestore
      setData((prevData) => prevData.filter((item) => item.id !== id)); // Update UI
      console.log(`Document with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting document:", err.message);
      setError("Failed to delete contact: " + err.message);
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No.',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
        
            title: '',
            key: 'action',
            render: (_, record) => (
             <div>
                {console.log(record)}
                <button onClick={()=>handleDelete(record.key)} className='cursor-pointer'><i className="ri-delete-bin-line text-xl"></i></button>
             </div>
            ),
          },
    
  ];

  if (loading) return <div><h2><Spin/></h2></div>;
  if (error) return <div><h2>{error}</h2></div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-300 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
      <div className='flex justify-between'>
      <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Fascave Admin</h1>
        </div>
        <div className="flex justify-center mb-6">
          <button className="text-sm font-bold bg-gray-800 px-3 py-2 text-gray-50 rounded-2xl cursor-pointer" onClick={()=> localStorage.removeItem("adminpassword")
          }>Logout</button>
        </div>
      </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white p-4">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
