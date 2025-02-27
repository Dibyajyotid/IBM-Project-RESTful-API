import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white flex justify-between p-5 flex-wrap mt-auto">
      <div className="flex-1 m-2">
        <h3 className="text-lg mb-2">Terms and Settings</h3>
        <ul className="list-none">
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Privacy & cookies
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Terms & conditions
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Grievance officer
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Modern Slavery Statement
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Human Rights Statement
          </li>
        </ul>
      </div>
      <div className="flex-1 m-2">
        <h3 className="text-lg mb-2">About</h3>
        <ul className="list-none">
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            About LetsGo.com
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            How We Work
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Sustainability
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Careers
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Investor relations
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Corporate contact
          </li>
        </ul>
      </div>
      <div className="flex-1 m-2">
        <h3 className="text-lg mb-2">Contact Us</h3>
        <ul className="list-none">
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Mail
          </li>
          <li className="text-sm text-gray-400 cursor-pointer hover:text-green-500">
            Ph no.
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
