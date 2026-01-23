'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Video } from 'lucide-react';
import { toast } from 'sonner';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ContentModal } from '@/components/dashboard/ContentModal';
import { ContentTable } from '@/components/dashboard/ContentTable';

export default function ReelsPlannerPage() {
  const {
    reelsContent,
    addReelsContent,
    updateReelsContent,
    deleteReelsContent,
  } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = (formData) => {
    if (editingItem) {
      updateReelsContent(editingItem.id, formData);
      toast.success('Reel content updated successfully!');
    } else {
      addReelsContent(formData);
      toast.success('Reel content added successfully!');
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteReelsContent(id);
    toast.success('Reel content deleted successfully!');
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-500/10 rounded-lg">
              <Video className="h-8 w-8 text-pink-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Reels Content Planner</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your video content ideas
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddNew}
            size="lg"
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Idea
          </Button>
        </div>

        {/* Content Table */}
        <ContentTable
          data={reelsContent}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <ContentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          initialData={editingItem}
          contentType="reels"
          buttonText={editingItem ? 'Update' : 'Add Idea'}
        />
      </motion.div>
    </div>
  );
}