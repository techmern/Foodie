import React, { useEffect, useState } from 'react';

function User_Profile() {


  const [userdata, setUserdata] = useState({});

  // Function to fetch user data from localStorage
  const fetchUserDataFromLocalStorage = () => {
    const userDataFromLocalStorage = localStorage.getItem('User');
    console.log('userDataFromLocalStorage:', userDataFromLocalStorage);

    if (userDataFromLocalStorage) {
      const userData = JSON.parse(userDataFromLocalStorage);
      console.log('Parsed User Data:', userData);

      setUserdata(userData);
      // console.log('User Profile Image:', userData.User_profile);
      // console.log('Image Source:', `./${userdata.User_profile}`);


    }
  };

  useEffect(() => {
    fetchUserDataFromLocalStorage();

  }, []);



  return (
    <div className='container-fluid'>
      <div className='row justify-content-center mt-4'>
        <div className='col-md-4 col-sm-6 col-12'>
          <div className='p-4' style={{ background: '#f5f5f5', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
            <h2 className="text-center mb-4">Your Profile</h2>
            <div className="text-center mb-3">
              <img
                src={`http://localhost:5000/${userdata.User_profile}`}
                // onError={(e) => {
                //   // console.error('Error loading image:', e.target.src);
                //   e.target.src = 'https://via.placeholder.com/100';
                // }}
                alt="Profile Picture"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />



            </div>
            <div className="mb-3">
              <input type="text" readOnly className="form-control" id="exampleInputusername1" aria-describedby="emailHelp" name='username' value={userdata.Username} />
            </div>
            <div className="mb-3">
              <input type="email" readOnly className="form-control" name='Email_Id' id="exampleInputEmail1" aria-describedby="emailHelp" value={userdata.Email_Id} />
            </div>
            {/* <div className="mb-3">
              <input type="text" readOnly className="form-control" id="exampleInputusername1" aria-describedby="emailHelp" name='Password' value={userdata.Password} />
            </div> */}
            <div className="mb-3">
              <input type="number" readOnly className="form-control" id="exampleInputsMob_No1" name='Mob_No' value={userdata.Mob_No} />
            </div>

            <div className=" text-center mb-3">
              <td><a type="submit" className="btn btn-primary " href="/updateuser">Edit</a> </td>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Profile;
