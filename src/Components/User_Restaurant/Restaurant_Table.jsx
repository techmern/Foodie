import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Restaurant_Table({ tid }) {


    const [tabledata, setTabledata] = useState({
        'table_availability': '',
        'table_number': '',
        'table_capacity': '',

    })

    const [guestOptions, setGuestOptions] = useState([]);
    const [tableNumbers, setTableNumbers] = useState([]);
    // get user
    useEffect(() => {
        const fetchUserDataFromLocalStorage = () => {
            const userDataFromLocalStorage = localStorage.getItem('User');
            if (userDataFromLocalStorage) {
                const userData = JSON.parse(userDataFromLocalStorage);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    userId: userData.userId,
                }));
            }
        };
        fetchUserDataFromLocalStorage();
    }, []);


    useEffect(() => {
        const getuser = async () => {
            try {
                const userDataFromLocalStorage = JSON.parse(localStorage.getItem('User'));
                console.log(userDataFromLocalStorage);

                const response = await axios.get(`http://localhost:5000/user/singleuser/${userDataFromLocalStorage.userId}`);
                setTabledata(response.data);

            } catch (error) {
                console.error('Error Viewing data:', error);
            }
        };
        getuser();
    }, []);

    // table booking
    const [formData, setFormData] = useState({
        restaurant_id: tid,
        table_id: '',
        userId: '',
        booking_date: '',
        number_of_people: 1,
        first_name: '',
        last_name: '',
        Email_Id: '',
        Mob_No: '',
        additional_request: '',
        booking_status: ''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // if (tabledata.table_availability !== 'Available') {
        //     alert('This table is not available for booking.');
        //     return;
        // }
        try {
            const response = await axios.post('http://localhost:5000/tablebooking/addtablebooking', {
                ...formData,

            });

            console.log('Booking Response:', response.data);
            if (response.data.sts === '0') {
                alert('Table booked successfully!');
                setFormData({
                    restaurant_id: tid,
                    table_id: '',
                    userId: '',
                    booking_date: '',
                    number_of_people: 1,
                    first_name: '',
                    last_name: '',
                    Email_Id: '',
                    Mob_No: '',
                    additional_request: '',
                    booking_status: '',

                });
            } else {
                alert('Table booking failed.');
            }
        } catch (error) {
            console.error('Error booking table:', error);
            alert('An error occurred while booking the table.');
        }
    };


    useEffect(() => {
        const gettable = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/restauranttable/gettabledata/${tid}`);
                // console.log('Table Data Response:', response.data);

                if (response.data.length > 0) {
                    const tables = response.data;
                    setTableNumbers(tables.map(table => ({
                        id: table._id,
                        number: table.table_number,
                        available: table.table_availability === 'Available'

                    })));

                    const firstTable = tables[0];
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        table_id: firstTable._id,
                    }));
                    setTabledata({
                        table_number: firstTable.table_number,
                        table_capacity: firstTable.table_capacity,
                    });

                    const options = Array.from({ length: firstTable.table_capacity }, (_, index) => index + 1);
                    setGuestOptions(options);


                }
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        gettable();

    }, [tid]);
    // console.log('Tabledata State:', tabledata); // Log tabledata state for debugging





    return (
        <div className='form' style={{ display: 'flex', minHeight: '100vh' }}>
            <div className='container'>
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <h2>Table Details</h2>
                            <p>Table Available: {tabledata.table_availability}</p>
                            <div className="col-md-4">
                                <label htmlFor="tableNumber" className="form-label">Select Table Number:</label>
                                <select
                                    className="form-select"
                                    name="table_id"
                                    value={formData.table_id}
                                    onChange={handleChange}
                                >
                                    {tableNumbers.map((table) => (
                                        <option key={table.id} value={table.id} disabled={!table.available}
                                            style={{ color: table.available ? 'black' : 'grey' }}>
                                           {table.number} {table.available ? '' : '(Booked)'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="date" className="form-label">Select Booking Date:</label>
                                <input type="date" className="form-control" name="booking_date" value={formData.booking_date} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="numberOfGuests" className="form-label">Number Of Guests</label>
                                <select
                                    className="form-select"
                                    name="number_of_people"
                                    value={formData.number_of_people}
                                    onChange={handleChange}
                                >
                                    {guestOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <h5>Enter Guest Details:</h5>
                            <div className="col-md-4">
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter First Name" />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-4">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" name="Email_Id" value={formData.Email_Id} onChange={handleChange} placeholder="Enter Email" />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" name="Mob_No" value={formData.Mob_No} onChange={handleChange} placeholder="Enter Phone Number" />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-8">
                                <label htmlFor="additionalRequest" className="form-label">Additional Request:</label>
                                <textarea className="form-control" name="additional_request" value={formData.additional_request} onChange={handleChange} rows="5"></textarea>
                            </div>
                        </div>

                        <div className="row mt-4 mb-4">
                            <div className="col-md-8">
                                <button type="submit" className="btn btn-danger col-md-5">Book</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Restaurant_Table
