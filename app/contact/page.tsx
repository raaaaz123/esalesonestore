'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/app/components/common/PageLayout';
import { Input } from '@/app/components/common/Input';
import { Button } from '@/app/components/common/Button';
import { PhoneInput } from '@/app/components/common/PhoneInput';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+1',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string, countryCode: string) => {
    setFormData(prev => ({ ...prev, phone: value, countryCode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+1',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <PageLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Thank you for your message!</h3>
              <p className="mt-2 text-sm text-gray-500">
                We've received your message and will get back to you as soon as possible.
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <PhoneInput
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  fullWidth
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="sm:flex sm:justify-end">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Phone Support</h3>
            <p className="mt-2 text-sm text-gray-500">
              Mon-Fri from 8am to 5pm
            </p>
            <p className="mt-2 text-sm text-blue-600 font-medium">+1 (555) 123-4567</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Email Support</h3>
            <p className="mt-2 text-sm text-gray-500">
              We'll respond within 24 hours
            </p>
            <p className="mt-2 text-sm text-blue-600 font-medium">support@esalesone.com</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Office Location</h3>
            <p className="mt-2 text-sm text-gray-500">
              123 Commerce Street
            </p>
            <p className="mt-1 text-sm text-gray-500">New York, NY 10001</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 