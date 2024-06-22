import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { selectUser } from "../../redux/slices/authSlice";


const UserProfile = ({ onEditClick }) => {
    const user = useSelector(selectUser);

  return (
    <div>
      <h2 className="text-orange-500 font-semibold text-xl mb-4">User Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Username:</label>
          <p>{user.UserName}</p>
        </div>
        <div>
          <label className="block text-gray-700">Fullname:</label>
          <p>{user.FullName}</p>
        </div>
        {/* <div>
          <label className="block text-gray-700">Gender:</label>
          <p>{user.Gender}</p>
        </div> */}
        <div>
          <label className="block text-gray-700">Email:</label>
          <p>{user.Email}</p>
        </div>
        {/* <div>
          <label className="block text-gray-700">Phone:</label>
          <p>{user.Phone}</p>
        </div> */}
        {/* <div>
          <label className="block text-gray-700">Address:</label>
          <p>{user.Address}</p>
        </div> */}
        <div className="flex justify-end space-x-4">
          <Button
            color="orange"
            variant="filled"
            onClick={onEditClick}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;