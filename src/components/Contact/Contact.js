import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { TextField, Button, Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
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

    setTimeout(() => {
      console.log('Form submitted:', formData);
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
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: null, message: '' });
      }, 5000);
    }, 1500);

    /* Uncomment this in production
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
    */
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  // Styled components
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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    margin: '0 8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: `0 5px 15px ${theme.palette.primary.main}40`
    },
    '& svg': {
      fontSize: '1.2rem'
    }
  }));

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="container">
        <motion.div 
          className="section-header text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="display-4 fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted">Let's work together on your next project</p>
        </motion.div>

        <div className="row g-4">
          <motion.div 
            className="col-lg-5"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index} 
                className="mb-4"
                variants={itemVariants}
              >
                <ContactCard>
                  <CardContent className="p-4 d-flex align-items-center">
                    <div className="contact-icon me-4">
                      {React.cloneElement(item.icon, { size: 28 })}
                    </div>
                    <div>
                      <h5 className="mb-1 fw-semibold">{item.title}</h5>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-decoration-none text-primary"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p className="mb-0 text-muted">{item.text}</p>
                      )}
                    </div>
                  </CardContent>
                </ContactCard>
              </motion.div>
            ))}

            <motion.div 
              className="social-section mt-4 text-center"
              variants={itemVariants}
            >
              <h5 className="mb-3 fw-semibold">Connect With Me</h5>
              <div className="d-flex justify-content-center">
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="mx-2"
                  >
                    {social.icon}
                  </SocialIcon>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="col-lg-7"
            variants={formVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <StyledCard>
              <CardHeader 
                title="Send Me a Message" 
                titleTypographyProps={{
                  variant: 'h5',
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}
                className="border-bottom"
              />
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <motion.div 
                      className="col-md-6 mb-3"
                      variants={itemVariants}
                    >
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        margin="normal"
                      />
                    </motion.div>
                    <motion.div 
                      className="col-md-6 mb-3"
                      variants={itemVariants}
                    >
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        margin="normal"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={itemVariants}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      margin="normal"
                    />
                  </motion.div>
                  
                  <motion.div className="mt-3" variants={itemVariants}>
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
                      margin="normal"
                    />
                  </motion.div>

                  <AnimatePresence>
                    {submitStatus.message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
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
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    className="mt-4 text-end"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <div className="spinner-border spinner-border-sm" role="status" /> : <FaPaperPlane />}
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
    </section>
  );
};

export default Contact;
