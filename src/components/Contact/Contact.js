import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaPhone, 
    FaPaperPlane, 
    FaLinkedin, 
    FaGithub, 
    FaTwitter,
    FaWhatsapp,
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { 
    Snackbar, 
    Alert 
} from '@mui/material';
import './Contact.css';

/* =====================
   MAIN COMPONENT
   ===================== */
const Contact = ({ setActiveSection = () => {} }) => {
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
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (inView) {
            setActiveSection('contact');
        }
    }, [inView, setActiveSection]);

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.name || !formData.email || !formData.message) {
            setSnackbar({
                open: true,
                message: 'Please fill in all required fields.',
                severity: 'warning'
            });
            setIsSubmitting(false);
            return;
        }

        try {
            await emailjs.send(
                'service_default', // Placeholder or use process.env if available
                'template_default',
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'adekunlequadri3@gmail.com'
                },
                'public_key'
            );

            setFormData({ name: '', email: '', subject: '', message: '' });
            setSnackbar({
                open: true,
                message: 'Message sent successfully! I will get back to you soon.',
                severity: 'success'
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setSnackbar({
                open: true,
                message: 'Failed to send message. Please try again later.',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: <FaEnvelope />, title: 'Email', text: 'adekunlequadri3@gmail.com', link: 'mailto:adekunlequadri3@gmail.com' },
        { icon: <FaPhone />, title: 'Phone', text: '+234 704 2277 326', link: 'tel:+2347042277326' },
        { icon: <FaMapMarkerAlt />, title: 'Location', text: 'Lagos, Nigeria', link: null }
    ];

    const socialLinks = [
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/adekunle-quadri-920038213', name: 'LinkedIn' },
        { icon: <FaGithub />, url: 'https://github.com/iam-donlarry', name: 'GitHub' },
        { icon: <FaTwitter />, url: 'https://twitter.com/Coredrii', name: 'Twitter' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/2347042277326', name: 'WhatsApp' }
    ];

    return (
        <section id="contact" ref={ref} className="contact-section">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title"><span className="primary-gradient">Contact</span></h2>
                    <p className="section-subtitle">Have a project in mind? Reach out and let's build something exceptional together.</p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div 
                        className="contact-info-column"
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="info-cards">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="info-card glass-card">
                                    <div className="info-icon">{item.icon}</div>
                                    <div className="info-text">
                                        <h4>{item.title}</h4>
                                        {item.link ? <a href={item.link}>{item.text}</a> : <p>{item.text}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links-wrap">
                            <h4>Follow Me</h4>
                            <div className="social-grid">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index} 
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="social-btn glass"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="contact-form-column"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form glass-card">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="Enter your name"
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Enter your email"
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input 
                                    type="text" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    placeholder="What's this about?"
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Let's talk about your project..."
                                    rows="5"
                                    required 
                                />
                            </div>
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'} <FaPaperPlane />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </section>
    );
};

export default Contact;
