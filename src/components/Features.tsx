'use client'

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LightBulbIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    title: "Innovative Solutions",
    description: "Cutting-edge tools to streamline your workflow and boost productivity.",
    icon: LightBulbIcon
  },
  {
    title: "Rapid Deployment",
    description: "Get up and running quickly with our easy-to-implement platform.",
    icon: RocketLaunchIcon
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security measures to keep your data safe and compliant.",
    icon: ShieldCheckIcon
  }
]

export default function Features() {
  return (
    <section className="py-24 px-6 bg-secondary-100">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center text-secondary-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Powerful Features for Your Business
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-primary-50 group">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary-600 mb-4 transition-colors duration-300 ease-in-out group-hover:text-primary-700" />
                  <CardTitle className="text-xl font-semibold text-secondary-800 transition-colors duration-300 ease-in-out group-hover:text-primary-800">{feature.title}</CardTitle>
                  <CardDescription className="text-secondary-600 transition-colors duration-300 ease-in-out group-hover:text-primary-700">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
