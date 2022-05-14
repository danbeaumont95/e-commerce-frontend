import React, { useEffect, useState } from 'react';
import UserService from '../Services/user';

const UserById = ({id}: {id: string}) => {

const [username, setUsername] = useState('');

  useEffect(() => {
    UserService.getUserById(id)
      .then((res) => {
        const {username} = res.data;
        setUsername(username)
      })
  }, []);

  return (
    <p>Seller: {username}</p>
  )
}

export default UserById
