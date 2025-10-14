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
    FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { styled } from '@mui/material/styles';
import { 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    Typography, 
    Snackbar, 
    Alert, 
    CircularProgress 
} from '@mui/material';
import './Contact.css';

/* =====================
   STYLED COMPONENTS
   ===================== */
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&:hover': {
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
    },
    [theme.breakpoints.down('md')]: {
        marginTop: '2rem'
    }
}));

const ContactCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: '15px',
    background: 'linear-gradient(145deg, #f0f2ff, #ffffff)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)'
    }
}));

const SocialIcon = styled('a')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(203, 172, 249, 0.1)',
    color: 'var(--color-primary)',
    margin: '0 8px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        transform: 'translateY(-3px)',
        boxShadow: '0 5px 15px rgba(203, 172, 249, 0.4)'
    },
    '& svg': {
        fontSize: '1.2rem',
        color: 'inherit'
    }
}));

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
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });
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

    // ✅ ENV CHECK
    useEffect(() => {
        console.log("EmailJS environment variables check:", {
            service: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            template: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            autoreply: process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID,
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        });
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
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
        setSubmitStatus({ success: null, message: '' });

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
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'adekunlequadri3@gmail.com'
                },
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );

            if (process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID) {
                await emailjs.send(
                    process.env.REACT_APP_EMAILJS_SERVICE_ID,
                    process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID,
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    },
                    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
                );
            }

            setFormData({ name: '', email: '', subject: '', message: '' });
            
            setSubmitStatus({
                success: true,
                message: 'Message sent successfully! I will get back to you soon.'
            });
            
            setSnackbar({
                open: true,
                message: 'Message sent successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setSubmitStatus({
                success: false,
                message: 'Failed to send message. Please try again later.'
            });
            setSnackbar({
                open: true,
                message: 'Failed to send message. Please check your network or try again later.',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: <FaMapMarkerAlt />, title: 'Location:', text: 'Lagos, Nigeria' },
        { icon: <FaEnvelope />, title: 'Email:', text: 'adekunlequadri3@gmail.com', link: 'mailto:adekunlequadri3@gmail.com' },
        { icon: <FaPhone />, title: 'Call:', text: '+234 704 2277 326', link: 'tel:+2347042277326' }
    ];

    const socialLinks = [
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/adekunle-quadri-920038213', name: 'LinkedIn' },
        { icon: <FaGithub />, url: 'https://github.com/iam-donlarry', name: 'GitHub' },
        { icon: <FaTwitter />, url: 'https://twitter.com/Coredrii', name: 'Twitter' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
    };

    const formContainerVariants = { 
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, delay: 0.2 } }
    };

    return (
        <section id="contact" ref={ref} className="contact-section">
            <div className="container">
                {/* --- Rest of your JSX remains unchanged --- */}
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </section>
    );
};

export default Contact;
