import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>CrimeChain</div>
            <ul style={styles.navLinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/reports" style={styles.link}>Reports</a></li>
                <li><a href="/about" style={styles.link}>About</a></li>
                <li><a href="/contact" style={styles.link}>Contact</a></li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', 
        padding: '0.75rem 2rem',
        color: '#fff',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        letterSpacing: '1px',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.2s',
    },
};

export default Navbar;