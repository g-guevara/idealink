"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Idea } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface IdeasFeedProps {
  ideas: Idea[];
}

export default function IdeasFeed({ ideas }: IdeasFeedProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Fade in animation for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {ideas.map((idea) => (
        <motion.div 
          key={idea.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          onClick={() => router.push(`/ideas/${idea.id}`)}
          onMouseEnter={() => setHoveredId(idea.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer"
        >
          <Card className={`h-full flex flex-col transition-shadow duration-300 ${
            hoveredId === idea.id ? 'shadow-lg' : 'shadow'
          }`}>
            <CardHeader>
              <CardTitle className="line-clamp-2">{idea.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {idea.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {idea.category}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-xs text-gray-500 mb-2">Looking for:</p>
                <div className="flex flex-wrap gap-1">
                  {idea.professions.slice(0, 3).map((profession, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {profession}
                    </span>
                  ))}
                  {idea.professions.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{idea.professions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}