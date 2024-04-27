import React from 'react';

const Footer = () => {
  return (
    <footer className="wow fadeInUp relative z-10 pt-20 lg:pt-[100px]" data-wow-delay=".15s" style={{ backgroundColor: '#6a7fc1' }}>
      <div className="container">
        <div className="sm:ml-8"> {/* Added margin for small screens */}
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
              <h2 className="text-[white] text-xl font-bold mb-8">About Us</h2>
              <p className="text-[#DADADA]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante vitae magna interdum efficitur.</p>
            </div>
            <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
              <h2 className="text-[white] text-xl font-bold mb-8">Quick Links</h2>
              <ul>
                <li><a href="#" className="text-[#DADADA] hover:text-[white]">Home</a></li>
                <li><a href="#" className="text-[#DADADA] hover:text-[white]">Services</a></li>
                <li><a href="#" className="text-[#DADADA] hover:text-[white]">About</a></li>
                <li><a href="#" className="text-[#DADADA] hover:text-[white]">Contact</a></li>
              </ul>
            </div>
            <div className="w-full lg:w-1/3">
              <h2 className="text-[white] text-xl font-bold mb-8">Contact Us</h2>
              <ul>
                <li className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#DADADA]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2C5.586 2 2 5.586 2 10c0 1.934.7 3.712 1.859 5.086l.062.07.007.008c.106.115.236.244.38.386l.007.008.05.054.022.024.025.027.026.028.031.034.037.04.033.036c.014.015.032.034.051.055l.013.013.047.05.02.021.02.021.024.025.018.02.022.023.026.028c.033.037.074.081.123.132l.03.029c.05.051.1.106.154.166l.04.043.014.015c.364.404.774.78 1.216 1.125.456.355.938.672 1.442.938.938.497 1.926.857 2.964 1.108.032.008.066.015.1.023.076.016.152.033.23.048.007 0 .015.007.022.007.334.057.678.086 1.022.086.04 0 .082 0 .122-.007.07 0 .14-.007.21-.014.034 0 .066-.008.1-.014.14-.023.277-.05.414-.085.036-.008.07-.015.107-.024 1.053-.25 2.038-.687 2.965-1.19.454-.266.879-.581 1.275-.934l.014-.015.044-.047c.052-.056.1-.11.148-.164l.034-.04.028-.028.025-.025.022-.023.02-.02.023-.024.02-.02.02-.02c.019-.02.037-.04.054-.055l.012-.013.034-.037.025-.028.022-.024.021-.022.05-.055c.145-.144.274-.273.38-.386l.007-.008.062-.07C17.3 13.712 18 11.934 18 10c0-4.414-3.586-8-8-8zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#DADADA]">123 Main Street, New York, NY 10001</span>
                </li>
                <li className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#DADADA]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.711 6.168l-1.389-.556c-.308-.124-.678-.066-.931.178L10 9.149l-2.392-2.36c-.253-.244-.623-.302-.931-.178l-1.389.556a1.15 1.15 0 00-.589.722l-.334 1.389c-.087.365.074.742.389.957l3.056 2.389L3.733 15c-.22.171-.319.462-.249.735l.445 1.544c.091.317.394.534.735.534.119 0 .241-.029.354-.09l1.423-.58c.317-.129.688-.067.947.177l2.662 2.627c.247.244.606.3.909.153l1.573-.654c.357-.148.77-.02.993.304l2.07 3.522c.17.29.512.472.893.472.158 0 .317-.037.464-.115l1.93-.808c.345-.145.59-.459.65-.83l.436-2.047c.071-.333-.094-.667-.39-.857L14.24 16.88c-.24-.2-.359-.514-.306-.833l.334-1.388a1.156 1.156 0 00-.59-.722zM5.293 15l-2.071-3.522c-.165-.281-.125-.643.094-.885l1.389-1.389a1.148 1.148 0 011.566 0l1.944.217 1.567-1.548a1.145 1.145 0 011.566 0l1.943 1.548 1.568-.217a1.15 1.15 0 011.865.722l-.334 1.389a1.148 1.148 0 01-.59.722l-1.389.556c-.247.1-.494.145-.745.145-.584 0-1.115-.358-1.326-.903l-.429-1.487-2.953-2.308a.848.848 0 01-.411-.672l-.333-1.388a1.15 1.15 0 00-.59-.722zM14 5v3.586L11.707 7.293a1 1 0 00-1.414 0L8 8.586 6.707 7.293a1 1 0 00-1.414 1.414L6 12.414V16H4V4h10z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#DADADA]">contact@example.com</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#DADADA]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17 3a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h14zm-1 2H4v10h12V5zm-5 7.414l1.293 1.293a1 1 0 001.414-1.414L11 10.586V7a1 1 0 10-2 0v3.586L8.293 11.707a1 1 0 001.414 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#DADADA]">(123) 456-7890</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
