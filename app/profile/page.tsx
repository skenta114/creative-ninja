import Link from 'next/link'

// components/Profile.js
import React from 'react';
import './style_profile.css';

const Profile = () => {
    return (
        <main>
            <div className='text-center'>
                <h1 className='title'>My Profile</h1>
                <p className='Icon'>
                    <img src='../images/koike.png' className="App-logo" alt="Icon" /></p>
                <p className='Name'>Name: Your Name</p>
                <input className='input'type="text" name="name" />
                <h2 className='Username'> Username</h2>
                <input className='inputinput'type="text" name="name" />
                
                <h3 className='Profile'>Profile</h3>
                <input className='inputinputinput'type="text" name="name" />
                <div>
                    <button type="submit" className='Button'>GO</button>
                </div>
            </div>
        </main>
    );
};

export default Profile;
