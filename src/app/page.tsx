"use client";

import React, { useState } from "react";
import TopBar from "@/components/website/TopBar";
import Navbar from "@/components/website/Navbar";
import HeroSlider from "@/components/website/HeroSlider";
import AboutSection from "@/components/website/AboutSection";
import ProductsSection from "@/components/website/ProductsSection";
import ServicesSection from "@/components/website/ServicesSection";
import StatsSection from "@/components/website/StatsSection";
import CropAdvisoryTool from "@/components/website/CropAdvisoryTool";
import NewsSection from "@/components/website/NewsSection";
import TestimonialsSection from "@/components/website/TestimonialsSection";
import GallerySection from "@/components/website/GallerySection";
import ContactSection from "@/components/website/ContactSection";
import Footer from "@/components/website/Footer";
import InquiryModal from "@/components/website/InquiryModal";
import FloatingActions from "@/components/website/FloatingActions";

export default function AksharaWebsitePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");
  const [inquiryCrop, setInquiryCrop] = useState("");

  const handleOpenInquiry = (type = "general", crop = "") => {
    setInquiryType(type);
    setInquiryCrop(crop);
    setIsInquiryModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-earth-50 text-stone-900 flex flex-col justify-between selection:bg-forest-700 selection:text-white">
      {/* 1. Top Announcement & Contact Bar */}
      <TopBar />

      {/* 2. Sticky Brand Header & Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* 3. Hero Section (Image Slider / Carousel) */}
      <HeroSlider onOpenInquiry={handleOpenInquiry} />

      {/* 4. About Us Section (Introduction, Mission, Vision, Pillars) */}
      <AboutSection />

      {/* 5. Our Products Section (Seeds, Fertilizers, Farm Produce, Equipment) */}
      <ProductsSection onOpenInquiry={handleOpenInquiry} />

      {/* 6. Services Section (Seed Distribution, Aggregation, Training, Agronomy, Credit) */}
      <ServicesSection onOpenInquiry={handleOpenInquiry} />

      {/* 7. Why Choose Us / Stats Counter Bar */}
      <StatsSection />

      {/* 8. Interactive Crop & Seed Calculator (Bonus Value Addition for Farmers) */}
      <CropAdvisoryTool onOpenInquiry={handleOpenInquiry} />

      {/* 9. Latest Updates / News & Farmer Success Stories */}
      <NewsSection />

      {/* 10. Farmer Testimonials Carousel */}
      <TestimonialsSection />

      {/* 11. Visual Field & FPC Photo Gallery */}
      <GallerySection />

      {/* 12. Contact Info, Helpline Cards, Google Maps, & FAQ */}
      <ContactSection />

      {/* 13. Comprehensive Agriculture Footer */}
      <Footer />

      {/* Interactive Global Inquiry & Booking Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialType={inquiryType}
        initialCrop={inquiryCrop}
      />

      {/* Floating WhatsApp Action & Scroll-To-Top */}
      <FloatingActions />
    </main>
  );
}
