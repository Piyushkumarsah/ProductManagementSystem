
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-red-800 w-screen text-white mt-auto relative bottom-0">
            <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold">Section 1</h3>
                    <p>Content for section 1</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold">Section 2</h3>
                    <p>Content for section 2</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Section 3</h3>
                    <p>Content for section 3</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
