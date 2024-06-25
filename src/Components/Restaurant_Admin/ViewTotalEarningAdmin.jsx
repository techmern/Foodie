import React, { useEffect, useState } from 'react';
import Sidebar from '../CommonLayouts/Navbar/Sidebar_Admin';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

function ViewTotalEarningAdmin() {
    const style = {
        container: {
            display: 'flex',
            height: '100vh',
        },
        secondcontainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
        },
        totalsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
        },
        box: {
            flex: '1',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            textAlign: 'center',
        },
        boximage: {
            flex: '1',
            padding: '20px',
            margin: '10px',
            marginBottom: '10px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            textAlign: 'center',
        },
        title: {
            fontSize: '18px',
            marginBottom: '10px',
        },
        maintitle: {
            fontSize: '32px',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '2px',
            margin: '40px 0',
            color: 'black',
        },
        amount: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        dateInput: {
            margin: '10px',
            padding: '10px',
            fontSize: '16px',
        },
        textBoxPayout: {
            margin: '10px',
            padding: '10px',
            fontSize: '16px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        paybutton: {
            padding: '10px 20px',
            fontSize: '16px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            height: '50px',
            width: '100px',
            marginBottom: '50px',
            marginTop: '10px',
            transition: 'background-color 0.3s',
        },
        fileInputContainer: {
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            marginTop: '20px',
        },
    };

    const [totals, setTotals] = useState({ totalCOD: 0, totalOnline: 0 });
    const [payouts, setPayouts] = useState({ totalPayout: 0 });
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [textBoxPayout, setTextBoxPayout] = useState(0);
    const { restaurantId } = useParams();
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    const [formData, setFormData] = useState({
        restaurant_id: restaurantId,
        transaction_id: '',
        paymentImg: '',
        payout_amt: '',
    });

    useEffect(() => {
        fetchTotals();
    }, []);

    const fetchTotals = async (fromDate = '', toDate = '') => {
        try {
            const response = await axios.get(`http://localhost:5000/restaurantorder/countAmount?fromDate=${fromDate}&toDate=${toDate}&restaurantId=${restaurantId}`);
            const { totalCOD, totalOnline } = response.data;
            setTotals({ totalCOD, totalOnline });
            const totalAmount = totalCOD + totalOnline;
            const newTotalPayout = totalAmount * 0.9;
            const weekPayoutResponse = await axios.get('http://localhost:5000/payoutadmin/getPayoutsAdmin');
            const totalPayoutAmt = weekPayoutResponse.data.totalPayoutAmt;
            const enterPayout = newTotalPayout - totalPayoutAmt;
            setPayouts({ totalPayout: newTotalPayout, enterPayout });
            setTextBoxPayout(enterPayout);
        } catch (error) {
            console.error('Error fetching totals:', error);
        }
    };

    const handleFetch = () => {
        if (fromDate && toDate) {
            fetchTotals(fromDate, toDate);
        } else {
            alert('Please select both from and to dates');
        }
    };

    const handlePayoutChange = (e) => {
        const inputValue = Number(e.target.value);
        if (inputValue <= payouts.enterPayout) {
            setTextBoxPayout(inputValue);
        } else {
            alert(`Payout cannot exceed ${payouts.enterPayout}`);
        }
    };

    const handlePay = async (e) => {
        e.preventDefault();
        const transactionId = Math.floor(Math.random() * 1000000000).toString(); 
        try {
            const formDataToUpload = new FormData();
            formDataToUpload.append('restaurant_id', formData.restaurant_id);
            formDataToUpload.append('transaction_id', transactionId);
            formDataToUpload.append('paymentImg', formData.paymentImg);
            formDataToUpload.append('payout_amt', textBoxPayout);

            const response = await axios.post('http://localhost:5000/payoutadmin/addPayout', formDataToUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                const { msg } = response.data;
                setShowToast(true);
                setMsg(msg);
                setType('success');

                // Fetch payouts for the week
                const weekPayoutResponse = await axios.get('http://localhost:5000/payoutadmin/getPayoutsAdmin');
                const totalPayoutAmt = weekPayoutResponse.data.totalPayoutAmt;

                console.log(`Total payout_amt for the week: ${totalPayoutAmt}`);
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error processing payout:', error);
            setShowToast(true);
            setMsg('Error processing payout');
            setType('error');
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                paymentImg: file,
                imgPreview: URL.createObjectURL(file)
            });
        } else {
            console.error("No file selected.");
        }
    };

    const remainingPayout = payouts.enterPayout !== null ? payouts.enterPayout - textBoxPayout : null;

    return (
        <div style={style.container}>
            <Sidebar />
            <div style={style.contentWrapper}>
                <div style={style.secondcontainer}>
                    <ErrorMessage showToast={showToast} msg={msg} type={type} />
                    <div style={style.maintitle}>View Weekly Earning</div>
                    <div style={style.inputContainer}>
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={style.dateInput} title="Select a date to see the amount for that date" />
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={style.dateInput} title="Select a date to see the amount for that date" />
                        <button onClick={handleFetch} style={style.button} onMouseEnter={(e) => e.target.style.backgroundColor = style.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = style.button.backgroundColor} title="Select a date to see the amount for that date">
                            Fetch Totals
                        </button>
                    </div>
                    <div style={style.totalsContainer}>
                        <div style={style.box}>
                            <div style={style.title}>Total Cash On Delivery</div>
                            <div style={style.amount}>{totals.totalCOD} Rs.</div>
                        </div>
                        <div style={style.box}>
                            <div style={style.title}>Total Online</div>
                            <div style={style.amount}>{totals.totalOnline} Rs.</div>
                        </div>
                    </div>
                    <div style={style.totalsContainer}>
                        <div style={style.box}>
                            <div style={style.title}>Total Amount</div>
                            <div style={style.amount}>{totals.totalCOD + totals.totalOnline} Rs.</div>
                        </div>
                        <div style={style.box}>
                            <div style={style.title}>90% Payout</div>
                            <div style={style.amount}>{payouts.totalPayout} Rs.</div>
                        </div>
                    </div>
                    <div style={style.totalsContainer}>
                        <div style={style.box}>
                            <div style={style.title}>Enter Payout</div>
                            <input type="number" value={textBoxPayout} onChange={handlePayoutChange} style={style.textBoxPayout} title="Enter payout amount" />
                        </div>

                        <div style={style.box}>
                            <div style={style.title}>Remaining Payout</div>
                            <div style={style.amount}>{remainingPayout !== null ? remainingPayout : 'Loading...'} Rs.</div>
                        </div>
                    </div>
                    <div style={style.boximage}>
                        <div style={style.title}>Upload Image</div>
                        <div className="form-sub-w3" style={style.fileInputContainer}>
                            <label htmlFor="fileInput" style={style.fileInputButton}>Choose Logo</label>
                            <input id="fileInput" type='file' name='paymentImg' style={style.fileInput} onChange={handleImgChange} />
                        </div>
                    </div>
                    <button onClick={handlePay} style={style.paybutton}>
                        Pay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewTotalEarningAdmin;