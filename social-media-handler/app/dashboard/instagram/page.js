'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ContentModal } from '@/components/dashboard/ContentModal';
import { ContentTable } from '@/components/dashboard/ContentTable';

export default function InstagramPlannerPage() {
  const {
    instagramContent,
    addInstagramContent,
    updateInstagramContent,
    deleteInstagramContent,
  } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = (formData) => {
    if (editingItem) {
      updateInstagramContent(editingItem.id, formData);
      toast.success('Instagram post updated successfully!');
    } else {
      addInstagramContent(formData);
      toast.success('Instagram post added successfully!');
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteInstagramContent(id);
    toast.success('Instagram post deleted successfully!');
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
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Instagram Post Planner</h1>
              <p className="text-muted-foreground mt-1">
                Design and schedule your Instagram posts
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddNew}
            size="lg"
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Content
          </Button>
        </div>

        {/* Content Table */}
        <ContentTable
          data={instagramContent}
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
          contentType="instagram"
          buttonText={editingItem ? 'Update' : 'Add Content'}
        />
      </motion.div>
    </div>
  );
}