import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });
  const form = useRef();

  useEffect(() => {
    if (inView) {
      setActiveSection('contact');
    }
  }, [inView, setActiveSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your EmailJS service ID, template ID, and public key
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log(result.text);
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! I will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        // Clear status after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ success: null, message: '' });
        }, 5000);
      });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location:',
      text: 'Lagos, Nigeria'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email:',
      text: 'adekunlequadri3@gmail.com',
      link: 'mailto:adekunlequadri3@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Call:',
      text: '+234 704 2277 326',
      link: 'tel:+2347042277326'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourprofile',
      name: 'LinkedIn'
    },
    {
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
      name: 'GitHub'
    },
    {
      icon: <FaTwitter />,
      url: 'https://twitter.com/yourhandle',
      name: 'Twitter'
    }
  ];

  return (
    <section id="contact" ref={ref} className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Get In Touch</p>
        </div>

        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              {contactInfo.map((item, index) => (
                <div className="address" key={index}>
                  <i>{item.icon}</i>
                  <h4>{item.title}</h4>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.text}
                    </a>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
              ))}

              <div className="social-links mt-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form 
              ref={form}
              onSubmit={handleSubmit}
              className="php-email-form"
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6 mt-3 mt-md-0">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              {submitStatus.message && (
                <div className={`my-3 ${submitStatus.success ? 'sent-message' : 'error-message'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="text-center">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
