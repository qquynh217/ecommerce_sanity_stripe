import React from 'react'
import Head from 'next/head';
import { Navbar } from '.';
import { Footer } from '.';

function Layout({ children }) {
    return (
        <div className='layout'>
            <Head>
                <title>JS Mastery Store</title>
            </Head>
            <div>
                <Navbar />
            </div>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;