'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'LinkedIn Content',
    description: 'Plan and schedule your LinkedIn posts',
    href: '/dashboard/linkedin',
    color: 'from-blue-500 to-blue-600',
    icon: '💼',
  },
  {
    title: 'Reels Content',
    description: 'Create and manage video content ideas',
    href: '/dashboard/reels',
    color: 'from-pink-500 to-pink-600',
    icon: '🎬',
  },
  {
    title: 'Instagram Posts',
    description: 'Design and schedule Instagram posts',
    href: '/dashboard/instagram',
    color: 'from-purple-500 to-purple-600',
    icon: '📸',
  },
  {
    title: 'General Ideas',
    description: 'Store all your creative ideas in one place',
    href: '/dashboard/ideas',
    color: 'from-yellow-500 to-yellow-600',
    icon: '💡',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Content Planner
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage all your social media content in one place
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                onClick={() => router.push(feature.href)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-4xl bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-lg`}>
                      {feature.icon}
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Click on any card above to start managing your content. Create, edit, and track your social media posts with ease.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}