import Link from 'next/link'

// components/Profile.js
import React from 'react';
import './style_profile.css';

const Profile = () => {
    return (
        <main>
            <div className='centerprofile'>
                <h1 className='title'>My Profile</h1>
                <figure className="icon-circle">
                    <img src="http://flat-icon-design.com/f/f_object_174/s512_f_object_174_0bg.jpg" alt="" /></figure>
                <p className='Name'>Name: Your Name</p>
                <input className='input' type="text" name="name" />
                <h2 className='Username'> Username</h2>
                <input className='inputinput' type="text" name="name" />

                <h3 className='Profile'>Profile</h3>
                <label>
                    <textarea className="textarea" ></textarea>
                </label>
                <div>

                    <button type="submit" className='Button'>GO</button>
                </div>
            </div>
        </main>
    );
};

export default Profile;
