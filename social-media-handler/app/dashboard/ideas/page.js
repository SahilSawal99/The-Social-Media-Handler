'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ContentModal } from '@/components/dashboard/ContentModal';
import { IdeaCard } from '@/components/dashboard/IdeaCard';

export default function GeneralIdeasPage() {
  const { generalIdeas, addGeneralIdea, updateGeneralIdea, deleteGeneralIdea } =
    useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = (formData) => {
    if (editingItem) {
      updateGeneralIdea(editingItem.id, formData);
      toast.success('Idea updated successfully!');
    } else {
      addGeneralIdea(formData);
      toast.success('Idea added successfully!');
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteGeneralIdea(id);
    toast.success('Idea deleted successfully!');
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
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">General Ideas</h1>
              <p className="text-muted-foreground mt-1">
                Store all your creative ideas in one place
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

        {/* Ideas Grid - Masonry Layout */}
        {generalIdeas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="rounded-full bg-muted p-6 mb-4">
              <Lightbulb className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No ideas yet</h3>
            <p className="text-muted-foreground mb-6">
              Click the "Add Idea" button to start collecting your creative ideas.
            </p>
            <Button onClick={handleAddNew} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Idea
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {generalIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <ContentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          initialData={editingItem}
          contentType="ideas"
          buttonText={editingItem ? 'Update' : 'Add Idea'}
        />
      </motion.div>
    </div>
  );
}