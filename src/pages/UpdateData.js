// import React, { useState, useEffect } from "react";
// import { db } from "../firebase/firebaseConfig";
// import Modal from "../components/Modal";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   Timestamp,
// } from "firebase/firestore";

// const UpdateData = () => {
//   const [calendarData, setCalendarData] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     year: 2024,
//     months: [
//       {
//         gregorian_month: "",
//         tamil_month_start: "",
//         tamil_month_end: "",
//         days: [],
//       },
//     ],
//   });

//   const [festivalInput, setFestivalInput] = useState({
//     date: "",
//     festival: "",
//   });
//   const [dayInput, setDayInput] = useState({
//     day: "",
//     nakshatram: "",
//     thithi: "",
//     rahu_kalam: "",
//     yamagandam: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch Tamil Calendar data from Firestore
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const querySnapshot = await getDocs(collection(db, "tamil_calendar"));
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const sortedData = data.sort((a, b) => a.year - b.year); // Sort by year if necessary
//       setCalendarData(sortedData);
//     } catch (error) {
//       alert("Error fetching data: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   useEffect(() => {
//     fetchData(); // Call fetchData on component mount
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle festival input change
//   const handleFestivalChange = (e) => {
//     setFestivalInput({ ...festivalInput, [e.target.name]: e.target.value });
//   };

//   // Handle day input change
//   const handleDayChange = (e) => {
//     setDayInput({ ...dayInput, [e.target.name]: e.target.value });
//   };

//   // Handle editing
//   const handleEdit = (id, data) => {
//     setEditId(id);
//     setFormData(data);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setEditId(null);
//     setFormData({
//       year: 2024,
//       months: [
//         {
//           gregorian_month: "",
//           tamil_month_start: "",
//           tamil_month_end: "",
//           days: [],
//         },
//       ],
//     });
//     setModalOpen(false);
//   };

//   // Update data in Firestore
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!formData.months[0].gregorian_month || !formData.months[0].tamil_month_start || !formData.months[0].tamil_month_end) {
//       alert("Please fill all fields.");
//       return;
//     }
//     if (editId) {
//       const docRef = doc(db, "tamil_calendar", editId);
//       await updateDoc(docRef, formData);
//       alert("Data updated successfully!");
//       setEditId(null); // Reset form after update
//       fetchData(); // Re-fetch the updated data
//       handleCloseModal();
//     }
//   };

//   // Add new data to Firestore
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!formData.months[0].gregorian_month || !formData.months[0].tamil_month_start || !formData.months[0].tamil_month_end) {
//       alert("Please fill all fields.");
//       return;
//     }
//     await addDoc(collection(db, "tamil_calendar"), formData);
//     alert("New entry added successfully!");
//     setFormData({
//       year: 2024,
//       months: [
//         {
//           gregorian_month: "",
//           tamil_month_start: "",
//           tamil_month_end: "",
//           days: [],
//         },
//       ],
//     });
//     fetchData(); // Re-fetch the updated data
//   };

//   // Add festival to the festivals array
//   const handleAddFestival = () => {
//     if (!festivalInput.date || !festivalInput.festival) {
//       alert("Please fill both festival date and name.");
//       return;
//     }
//     const newFestival = {
//       date: Timestamp.fromDate(new Date(festivalInput.date)),
//       festival: festivalInput.festival,
//     };
//     setFormData((prev) => ({
//       ...prev,
//       months: prev.months.map(month => ({
//         ...month,
//         festivals: [...(month.festivals || []), newFestival],
//       })),
//     }));
//     setFestivalInput({ date: "", festival: "" }); // Reset festival input
//   };

//   // Add day to the days array
//   const handleAddDay = () => {
//     if (
//       !dayInput.day ||
//       !dayInput.nakshatram ||
//       !dayInput.thithi ||
//       !dayInput.rahu_kalam ||
//       !dayInput.yamagandam
//     ) {
//       alert("Please fill all day details.");
//       return;
//     }
//     const newDay = {
//       day: dayInput.day,
//       nakshatram: dayInput.nakshatram,
//       thithi: dayInput.thithi,
//       rahu_kalam: dayInput.rahu_kalam,
//       yamagandam: dayInput.yamagandam,
//     };
//     setFormData((prev) => ({
//       ...prev,
//       months: prev.months.map(month => ({
//         ...month,
//         days: [...(month.days || []), newDay],
//       })),
//     }));
//     setDayInput({
//       day: "",
//       nakshatram: "",
//       thithi: "",
//       rahu_kalam: "",
//       yamagandam: "",
//     }); // Reset day input
//   };

//   // Edit festival
//   const handleEditFestival = (index) => {
//     const festivalToEdit = formData.months[0].festivals[index];
//     setFestivalInput({
//       date: festivalToEdit.date.toDate().toISOString().split("T")[0],
//       festival: festivalToEdit.festival,
//     });
//     handleDeleteFestival(index); // Remove the festival to edit
//   };

//   // Edit day
//   const handleEditDay = (index) => {
//     const dayToEdit = formData.months[0].days[index];
//     setDayInput({
//       day: dayToEdit.day,
//       nakshatram: dayToEdit.nakshatram,
//       thithi: dayToEdit.thithi,
//       rahu_kalam: dayToEdit.rahu_kalam,
//       yamagandam: dayToEdit.yamagandam,
//     });
//     handleDeleteDay(index); // Remove the day to edit
//   };

//   // Delete festival from the festivals array
//   const handleDeleteFestival = (index) => {
//     const updatedFestivals = formData.months[0].festivals.filter((_, i) => i !== index);
//     setFormData({ ...formData, months: [{ ...formData.months[0], festivals: updatedFestivals }] });
//   };

//   // Delete day from the days array
//   const handleDeleteDay = (index) => {
//     const updatedDays = formData.months[0].days.filter((_, i) => i !== index);
//     setFormData({ ...formData, months: [{ ...formData.months[0], days: updatedDays }] });
//   };

//   // Delete data from Firestore
//   const handleDelete = async (id) => {
//     const docRef = doc(db, "tamil_calendar", id);
//     await deleteDoc(docRef);
//     setCalendarData(calendarData.filter((item) => item.id !== id));
//     alert("Data deleted successfully!");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {loading && <div className="text-center">Loading...</div>}
//       {/* Add New Entry Button */}
//       <div className="mb-4 flex justify-end">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => setModalOpen(true)}
//         >
//           Add New Entry
//         </button>
//       </div>

//       {/* Display Data in Table */}
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Year</th>
//             <th className="border border-gray-300 p-2">Gregorian Month</th>
//             <th className="border border-gray-300 p-2">Tamil Month Start</th>
//             <th className="border border-gray-300 p-2">Tamil Month End</th>
//             <th className="border border-gray-300 p-2">Days</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {calendarData.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center p-4">No data available.</td>
//             </tr>
//           ) : (
//             calendarData.map((item) => (
//               <tr key={item.id}>
//                 <td className="border border-gray-300 p-2">{item.year}</td>
//                 <td className="border border-gray-300 p-2">{item.months[0]?.gregorian_month || '-'}</td>
//                 <td className="border border-gray-300 p-2">{item.months[0]?.tamil_month_start || '-'}</td>
//                 <td className="border border-gray-300 p-2">{item.months[0]?.tamil_month_end || '-'}</td>
//                 <td className="border border-gray-300 p-2">{item.months[0]?.days.length || 0}</td>
//                 <td className="border border-gray-300 p-2">
//                   <button
//                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                     onClick={() => handleEdit(item.id, item)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Modal for Add/Edit Entry */}
//       {isModalOpen && (
//         <Modal onClose={handleCloseModal}>
//           <form onSubmit={editId ? handleUpdate : handleAdd} className="p-4">
//             <h2 className="text-xl mb-4">{editId ? "Edit Entry" : "Add New Entry"}</h2>
//             <div className="mb-4">
//               <label className="block mb-1" htmlFor="year">Year:</label>
//               <input
//                 type="number"
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-2 w-full"
//                 required
//               />
//             </div>
//             {formData.months.map((month, index) => (
//               <div key={index}>
//                 <h3 className="text-lg mt-4">Month {index + 1}</h3>
//                 <div className="mb-4">
//                   <label className="block mb-1" htmlFor={`gregorian_month_${index}`}>Gregorian Month:</label>
//                   <input
//                     type="text"
//                     name="gregorian_month"
//                     value={month.gregorian_month}
//                     onChange={(e) => {
//                       const newMonths = [...formData.months];
//                       newMonths[index].gregorian_month = e.target.value;
//                       setFormData({ ...formData, months: newMonths });
//                     }}
//                     className="border border-gray-300 p-2 w-full"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1" htmlFor={`tamil_month_start_${index}`}>Tamil Month Start:</label>
//                   <input
//                     type="text"
//                     name="tamil_month_start"
//                     value={month.tamil_month_start}
//                     onChange={(e) => {
//                       const newMonths = [...formData.months];
//                       newMonths[index].tamil_month_start = e.target.value;
//                       setFormData({ ...formData, months: newMonths });
//                     }}
//                     className="border border-gray-300 p-2 w-full"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1" htmlFor={`tamil_month_end_${index}`}>Tamil Month End:</label>
//                   <input
//                     type="text"
//                     name="tamil_month_end"
//                     value={month.tamil_month_end}
//                     onChange={(e) => {
//                       const newMonths = [...formData.months];
//                       newMonths[index].tamil_month_end = e.target.value;
//                       setFormData({ ...formData, months: newMonths });
//                     }}
//                     className="border border-gray-300 p-2 w-full"
//                     required
//                   />
//                 </div>
//                 <h4 className="text-md mb-2">Festivals</h4>
//                 {month.festivals && month.festivals.length > 0 ? (
//                   month.festivals.map((festival, index) => (
//                     <div key={index} className="flex justify-between mb-2">
//                       <div>{festival.festival} on {festival.date.toDate().toLocaleDateString()}</div>
//                       <button className="text-red-500" onClick={() => handleDeleteFestival(index)}>Delete</button>
//                       <button className="text-blue-500" onClick={() => handleEditFestival(index)}>Edit</button>
//                     </div>
//                   ))
//                 ) : (
//                   <div>No festivals added.</div>
//                 )}
//                 <div className="flex">
//                   <input
//                     type="date"
//                     name="date"
//                     value={festivalInput.date}
//                     onChange={handleFestivalChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <input
//                     type="text"
//                     name="festival"
//                     placeholder="Festival Name"
//                     value={festivalInput.festival}
//                     onChange={handleFestivalChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <button type="button" onClick={handleAddFestival} className="bg-green-500 text-white px-2 py-1">Add Festival</button>
//                 </div>

//                 <h4 className="text-md mb-2">Days</h4>
//                 {month.days && month.days.length > 0 ? (
//                   month.days.map((day, index) => (
//                     <div key={index} className="flex justify-between mb-2">
//                       <div>{day.day}: {day.nakshatram}, {day.thithi}, {day.rahu_kalam}, {day.yamagandam}</div>
//                       <button className="text-red-500" onClick={() => handleDeleteDay(index)}>Delete</button>
//                       <button className="text-blue-500" onClick={() => handleEditDay(index)}>Edit</button>
//                     </div>
//                   ))
//                 ) : (
//                   <div>No days added.</div>
//                 )}
//                 <div className="flex">
//                   <input
//                     type="text"
//                     name="day"
//                     placeholder="Day"
//                     value={dayInput.day}
//                     onChange={handleDayChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <input
//                     type="text"
//                     name="nakshatram"
//                     placeholder="Nakshatram"
//                     value={dayInput.nakshatram}
//                     onChange={handleDayChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <input
//                     type="text"
//                     name="thithi"
//                     placeholder="Thithi"
//                     value={dayInput.thithi}
//                     onChange={handleDayChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <input
//                     type="text"
//                     name="rahu_kalam"
//                     placeholder="Rahu Kalam"
//                     value={dayInput.rahu_kalam}
//                     onChange={handleDayChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <input
//                     type="text"
//                     name="yamagandam"
//                     placeholder="Yamagandam"
//                     value={dayInput.yamagandam}
//                     onChange={handleDayChange}
//                     className="border border-gray-300 p-2 mr-2"
//                   />
//                   <button type="button" onClick={handleAddDay} className="bg-green-500 text-white px-2 py-1">Add Day</button>
//                 </div>
//               </div>
//             ))}
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//               {editId ? "Update Entry" : "Add Entry"}
//             </button>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default UpdateData;


import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import Modal from "../components/Modal"; // Assuming you have a Modal component for add/edit

const UpdateData = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ year: '', months: [] });
  const [editId, setEditId] = useState(null);
  const [festivalInput, setFestivalInput] = useState({ date: '', festival: '' });
  const [dayInput, setDayInput] = useState({ day: '', nakshatram: '', thithi: '', rahu_kalam: '', yamagandam: '' });

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const yearDoc = await getDoc(doc(db, 'tamil_calendar', 'year-2024'));
      if (yearDoc.exists()) {
        const monthsCollection = collection(yearDoc.ref, 'months');
        const monthsSnapshot = await getDocs(monthsCollection);
        const monthsData = await Promise.all(monthsSnapshot.docs.map(async (monthDoc) => {
          const daysCollection = collection(monthDoc.ref, 'days');
          const daysSnapshot = await getDocs(daysCollection);
          const daysData = daysSnapshot.docs.map(dayDoc => ({
            id: dayDoc.id,
            ...dayDoc.data()
          }));
          return { id: monthDoc.id, ...monthDoc.data(), days: daysData };
        }));
        setCalendarData(monthsData);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ year: '2024', months: [] });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle editing of a month or day
  const handleEdit = (id, monthData) => {
    setEditId(id);
    setFormData(monthData); // Set the data for editing
    setIsModalOpen(true); // Open the modal
  };

  // Handle deletion of a month
  const handleDelete = async (id) => {
    try {
      // Confirm before deletion (you can customize this)
      if (window.confirm('Are you sure you want to delete this month?')) {
        await deleteDoc(doc(db, 'tamil_calendar', 'year-2024', 'months', id));
        setCalendarData(calendarData.filter(month => month.id !== id)); // Update state
        alert('Month deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting month:', error);
      alert('Error deleting month. Please try again.');
    }
  };

  // Render data in the table
  return (
    <div>
      <button onClick={handleOpenModal} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Add New Entry
      </button>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Month</th>
            <th className="border border-gray-300 p-2">Days</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">No data available.</td>
            </tr>
          ) : ( 
            calendarData.map((month) => (
              <tr key={month.id}>
                <td className="border border-gray-300 p-2">{month.id}</td>
                <td className="border border-gray-300 p-2">{month.days.length}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(month.id, month)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(month.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit Entry */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {/* Add your modal form here */}
        </Modal>
      )}
    </div>
  );
};

export default UpdateData;


