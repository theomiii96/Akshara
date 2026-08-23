"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Building,
  Headphones,
  Sprout,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FAQ_ITEMS } from "@/data/website-data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Certified Seeds Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "Certified Seeds Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-earth-50 relative border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-300 text-forest-800 text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-forest-600" />
            <span>Always Ready To Serve Our Farmers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight">
            Get In Touch & <span className="text-forest-700">Kisan Helpdesk</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Visit our registered central hub, call our toll-free farmer helpline, or send an inquiry for seed pre-bookings and market linkages.
          </p>
        </div>

        {/* Contact Info Cards & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Helpline Card */}
            <div className="p-6 rounded-3xl bg-forest-900 text-white shadow-xl border border-forest-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-harvest-400">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-harvest-400 font-bold uppercase">24/7 Farmer Helpline</div>
                  <div className="text-xl font-display font-black">1800-889-2345</div>
                </div>
              </div>
              <p className="text-xs text-earth-200 leading-relaxed">
                Toll-free telephonic assistance for seed booking, pest diagnosis, and government subsidy registration.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="tel:18008892345"
                  className="flex-1 btn-harvest text-xs py-2.5 justify-center font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Toll-Free</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Address & Office Details */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Registered Central Office
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    Akshara Farmer Producer Company Ltd.
                  </div>
                  <div className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Plot No. 42, Krishi Seva Kendra Complex, APMC Market Yard Road, Niphad, Nashik, Maharashtra - 422303, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Email Correspondence
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                    <a href="mailto:support@aksharafpc.org" className="hover:text-forest-700">support@aksharafpc.org</a> / <a href="mailto:contact@aksharafpc.org" className="hover:text-forest-700">contact@aksharafpc.org</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Office & Mandi Hub Hours
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                    Monday to Saturday: 8:00 AM - 7:00 PM (Sunday Closed)
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Visual Embed Container */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-200 aspect-[16/9] relative">
              <iframe
                title="Akshara Farmer Producer Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119939.81896791166!2d73.9786445582031!3d20.082725200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddc546b8565b93%3A0x673031023a19bc89!2sNiphad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: Interactive Contact Form & FAQ */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Form Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-black text-stone-900">
                  Send Us A Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill out this form and our agronomy/sales officer will respond within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-forest-50 border border-forest-200 text-center space-y-2 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-forest-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-forest-950 font-display">
                    Thank You For Reaching Out!
                  </h4>
                  <p className="text-xs sm:text-sm text-forest-800 max-w-md mx-auto leading-relaxed">
                    Your message has been received. Our team will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Balram Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white font-medium text-stone-800"
                      >
                        <option value="Certified Seeds Inquiry">Certified Seeds Booking & Inquiry</option>
                        <option value="FPC Membership Registration">FPC Farmer Membership Registration</option>
                        <option value="Bio-Fertilizers & Nutrients">Bio-Fertilizers & Organic Inputs</option>
                        <option value="Produce Aggregation & Mandi Sale">Produce Aggregation & Mandi Sale</option>
                        <option value="Agronomy & Soil Testing">Agronomy & Free Soil Testing</option>
                        <option value="Institutional Wholesale Purchase">Institutional Wholesale B2B Purchase</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Your Message / Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please let us know your village, crop details, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-sm py-3.5 justify-center shadow-agri"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Akshara FPC</span>
                  </button>
                </form>
              )}
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-forest-700" />
                <h4 className="text-lg font-display font-black text-stone-900">
                  Frequently Asked Questions
                </h4>
              </div>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-stone-900 hover:text-forest-700 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-forest-600 flex-shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0 ml-2" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
