'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-primary-900 text-white overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Transform Your Business?
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 text-primary-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join thousands of satisfied customers and take your operations to the next level.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" variant="secondary" className="bg-white text-primary-900 hover:bg-primary-100">Start Your Free Trial</Button>
        </motion.div>
      </div>
    </section>
  )
}
