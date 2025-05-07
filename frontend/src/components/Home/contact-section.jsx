import '../../styles/contact.css'
import '../../styles/home.css'
import { useState } from 'react'


export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        alert('Message sent!');
        console.log("Send message placeholder (fetch):", formData);
        
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    }

    return (
        <section className='contact-section' id='contact'>
            <div className="contact-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder='name' value={formData.name} onChange={handleChange} />
                    {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}

                    <input type="email" name='email' placeholder='email' value={formData.email} onChange={handleChange} />
                    {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

                    <input type="text" name="subject" placeholder='subject' value={formData.subject} onChange={handleChange} />
                    {errors.subject && <small style={{ color: 'red' }}>{errors.subject}</small>}

                    <textarea name="message" placeholder='message' value={formData.message} onChange={handleChange}></textarea>
                    {errors.message && <small style={{ color: 'red' }}>{errors.message}</small>}

                    <button type='submit' className='contact-send-btn'>SEND MESSAGE</button>
                </form>

                <div className="contact-info-text">
                    <h2>Get in touch.</h2>
                    <p>
                        We value meaningful conversations. <br />
                        Fill in the form and we'll <br />
                        respond with care.
                    </p>
                </div>
            </div>
        </section>
    )
}