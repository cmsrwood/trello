import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
    const { role } = useAuth(); // Obtén el rol del contexto

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {role === 'user' && (
                    <>
                        <li>
                            <Link to="/user">User Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </>
                )}
                {role === 'guest' && (
                    <>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

