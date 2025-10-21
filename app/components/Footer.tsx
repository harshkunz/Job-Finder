'use client'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import Link from 'next/link';
import { FaDocker } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="text-gray-800 py-5 border border-gray-300">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Section */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="flex items-center gap-3 transition-colors cursor-pointer transition-transform transform hover:scale-105">
            <MdEmail size={22} />
            <a className='text-sm' href="mailto:support@openai.com">support@openAsk.com</a>
          </p>
          <p className="flex items-center gap-3 transition-colors cursor-pointer transition-transform transform hover:scale-105">
            <MdPhone size={22} />
            <a className='text-sm' href="tel:+18001234567">+1 (800) 123-4567</a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-5 text-2xl mt-2">
            <Link href="https://twitter.com/" target="_blank">
              <FaTwitter size={28} className=" transition-transform transform hover:scale-110" />
            </Link>
            <Link href="https://docker.com/" target="_blank">
              <FaDocker size={30} className="transition-transform transform hover:scale-110" />
            </Link>
            <Link href="https://github.com/harshkunz" target="_blank">
              <FaGithub size={28} className=" transition-transform transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
