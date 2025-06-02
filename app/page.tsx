"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockIdeas } from '@/data/mockData';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Home() {
  const letters = ['I', 'D', 'E', 'A', 'L', 'I', 'N', 'K'];
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const filteredIdeas = mockIdeas.filter((idea) => {
    const matchesCategory = category === 'all' || idea.category === category;
    const matchesSearch =
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="border border-black">
      <div className="grid grid-cols-4 sm:grid-cols-8 divide-x divide-black">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="h-[80px] sm:h-[120px] md:h-[150px] lg:h-[200px] flex items-center justify-center overflow-hidden border-b border-black"
            {...fadeIn}
            transition={{ delay: index * 0.1 }}
          >
<span className="font-black leading-none text-[145px] sm:text-[200px] md:text-[250px] lg:text-[400px] flex items-center justify-center w-full h-full">
              {letter}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid-cell grid-cell-large p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-black"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px] border-black">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="border-black">
              <SelectItem value="all">All Categories</SelectItem>
              {['Technology', 'Design', 'Business', 'Marketing', 'Education'].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Ideas */}
      <div className="grid-cell grid-cell-large p-4">
        <div className="relative">
          <div className="relative z-10 space-y-4">
            <h2 className="text-xl font-bold tracking-tight">
              Featured Ideas ({filteredIdeas.length})
            </h2>
            <div className="content-grid">
              {filteredIdeas.slice(0, 6).map((idea, index) => (
                <Link key={idea.id} href={`/idea-details?id=${idea.id}`}>
                  <div className="content-cell">
                    <span className="text-xs text-gray-400 mb-2 block">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-bold mb-2">{idea.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{idea.shortDescription}</p>
                    <div className="modernist-list">
                      {idea.professions.slice(0, 2).map((prof, i) => (
                        <div key={i} className="modernist-list-item">
                          {prof}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="grid-cell grid-cell-small p-4">
        <div className="relative z-10 flex flex-col justify-between h-full">
          <h2 className="text-xl font-bold tracking-tight mb-4">Join Now</h2>
          <Link href="/dashboard">
            <button className="btn-modernist w-full">Start Creating</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
