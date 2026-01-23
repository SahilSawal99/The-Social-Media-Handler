'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function ContentModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  contentType = 'linkedin',
  buttonText = 'Add Idea',
}) {
  const [formData, setFormData] = useState({
    title: '',
    script: '',
    description: '',
    postingDate: '',
    postingTime: '',
    status: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        script: initialData.script || '',
        description: initialData.description || '',
        postingDate: initialData.postingDate || '',
        postingTime: initialData.postingTime || '',
        status: initialData.status || '',
      });
    } else {
      setFormData({
        title: '',
        script: '',
        description: '',
        postingDate: '',
        postingTime: '',
        status: getDefaultStatus(),
      });
    }
  }, [initialData, isOpen]);

  const getDefaultStatus = () => {
    switch (contentType) {
      case 'linkedin':
        return 'Not Posted';
      case 'reels':
        return 'Not Created';
      case 'instagram':
        return 'Not Designed';
      default:
        return '';
    }
  };

  const getStatusOptions = () => {
    switch (contentType) {
      case 'linkedin':
        return ['Not Posted', 'Posted'];
      case 'reels':
        return ['Not Created', 'Created', 'Not Published', 'Published'];
      case 'instagram':
        return ['Not Designed', 'Designed', 'Not Posted', 'Posted'];
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDateSelect = (date) => {
    if (date) {
      setFormData({ ...formData, postingDate: format(date, 'yyyy-MM-dd') });
    }
  };

  const isGeneralIdeas = contentType === 'ideas';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit' : 'Add'}{' '}
            {isGeneralIdeas ? 'Idea' : 'Content'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {initialData ? 'update' : 'create'} your content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
              required
            />
          </div>

          {/* Script or Description */}
          {isGeneralIdeas ? (
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter description"
                rows={5}
                required
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="script">Script (Additional)</Label>
                <Textarea
                  id="script"
                  value={formData.script}
                  onChange={(e) =>
                    setFormData({ ...formData, script: e.target.value })
                  }
                  placeholder="Enter script or additional notes"
                  rows={5}
                />
              </div>

              {/* Posting Date */}
              <div className="space-y-2">
                <Label>Posting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !formData.postingDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.postingDate
                        ? format(new Date(formData.postingDate), 'PPP')
                        : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.postingDate
                          ? new Date(formData.postingDate)
                          : undefined
                      }
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Posting Time */}
              <div className="space-y-2">
                <Label htmlFor="postingTime">Posting Time</Label>
                <Input
                  id="postingTime"
                  type="time"
                  value={formData.postingTime}
                  onChange={(e) =>
                    setFormData({ ...formData, postingTime: e.target.value })
                  }
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatusOptions().map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{buttonText}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}