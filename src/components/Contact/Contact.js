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
    FaTimesCircle,
    FaWhatsapp,
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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
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
            
            setSnackbar({
                open: true,
                message: 'Message sent successfully! I will get back to you soon.',
                severity: 'success'
            });
        } catch (error) {
            console.error('Failed to send message:', error);
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
        { icon: <FaPhone />, title: 'Call or WhatsApp:', text: '+234 704 2277 326', link: 'tel:+2347042277326' }
    ];

    const socialLinks = [
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/adekunle-quadri-920038213', name: 'LinkedIn' },
        { icon: <FaGithub />, url: 'https://github.com/iam-donlarry', name: 'GitHub' },
        { icon: <FaTwitter />, url: 'https://twitter.com/Coredrii', name: 'Twitter' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/2347042277326', name: 'WhatsApp' }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0, opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 12 }
        }
    };

    const formContainerVariants = { 
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1, opacity: 1,
            transition: { type: 'spring', stiffness: 100, delay: 0.2 }
        }
    };

    return (
        <section id="contact" ref={ref} className="contact-section">
            <div className="container">
                <motion.div 
                    className="section-header text-center mb-5"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="display-6 fw-bold mb-3" style={{ color: 'white' }}>Get In Touch</h3>
                    <p className="lead" style={{ color: 'white', opacity: 0.9 }}>Let's work together on your next project</p>
                </motion.div>

                <div className="row g-4">
                    {/* Contact Info & Social Links */}
                    <motion.div 
                        className="col-lg-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div key={index} className="mb-4" variants={itemVariants}>
                                <ContactCard>
                                    <CardContent className="p-4 d-flex align-items-center">
                                        <div className="contact-icon me-4" style={{ color: 'var(--color-primary)' }}>
                                            {React.cloneElement(item.icon, { size: 28 })}
                                        </div>
                                        <div>
                                            <h5 className="mb-1 fw-semibold">{item.title}</h5>
                                            {item.link ? (
                                                <a href={item.link} className="text-decoration-none text-primary" target="_blank" rel="noopener noreferrer">
                                                    {item.text}
                                                </a>
                                            ) : (
                                                <p className="mb-0" style={{ color: 'var(--color-primary)', opacity: 0.9 }}>{item.text}</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </ContactCard>
                            </motion.div>
                        ))}

                        <motion.div className="social-section mt-4 text-center" variants={itemVariants}>
                            <h5 className="mb-3 fw-semibold">Connect With Me</h5>
                            <div className="d-flex justify-content-center">
                                {socialLinks.map((social, index) => (
                                    <SocialIcon key={index} href={social.url.trim()} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                        {social.icon}
                                    </SocialIcon>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        className="col-lg-7"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <StyledCard>
                            <CardContent sx={{ 
                                backgroundColor: 'var(--color-primary)',
                                textAlign: 'center',
                                py: 2,
                                '&:last-child': { paddingBottom: 2 }
                            }}>
                                <Typography variant="h5" component="h2" sx={{ color: 'common.white', fontWeight: 'bold', mb: 0 }}>
                                    Send Me a Message
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                    borderColor: 'text.primary',
                                                    },
                                                    '&:hover fieldset': {
                                                    borderColor: 'primary.main',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                    borderColor: '',
                                                    },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                    color: 'grey',
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                    color: 'grey',
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <TextField
                                                fullWidth
                                                label="Your Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                    borderColor: 'text.primary',
                                                    },
                                                    '&:hover fieldset': {
                                                    borderColor: 'primary.main',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                    borderColor: '',
                                                    },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                    color: 'grey',
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                    color: 'grey',
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                borderColor: 'text.primary',
                                                },
                                                '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                borderColor: '',
                                                },
                                                },
                                                '& .MuiInputLabel-root': {
                                                color: 'grey',
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                color: 'grey',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <TextField
                                            fullWidth
                                            label="Your Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            variant="outlined"
                                            required
                                            multiline
                                            rows={4}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                borderColor: 'text.primary',
                                                },
                                                '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                borderColor: '',
                                                },
                                                },
                                                '& .MuiInputLabel-root': {
                                                color: 'grey',
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                color: 'grey',
                                                }
                                            }}
                                        />
                                    </div>

                                    {submitStatus.message && (
                                        <div
                                            className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} mt-3`}
                                            role="alert"
                                        >
                                            <div className="d-flex align-items-center">
                                                {submitStatus.success ? (
                                                    <FaCheckCircle className="me-2" />
                                                ) : (
                                                    <FaTimesCircle className="me-2" />
                                                )}
                                                {submitStatus.message}
                                            </div>
                                        </div>
                                    )}

                                    <motion.div 
                                        className="mt-4 text-end"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={isSubmitting}
                                            startIcon={
                                                isSubmitting ? (
                                                    <CircularProgress size={20} color="inherit" />
                                                ) : (
                                                    <FaPaperPlane />
                                                )
                                            }
                                            sx={{
                                                backgroundColor: 'var(--color-primary)',
                                                '&:hover': {
                                                    backgroundColor: 'var(--color-primary-dark, #B38AF6)',
                                                },
                                                '&:disabled': {
                                                    backgroundColor: 'rgba(203, 172, 249, 0.5)'
                                                }
                                            }}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </StyledCard>
                    </motion.div>
                </div>
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
