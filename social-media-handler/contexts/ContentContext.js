'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [linkedinContent, setLinkedinContent] = useState([]);
  const [reelsContent, setReelsContent] = useState([]);
  const [instagramContent, setInstagramContent] = useState([]);
  const [generalIdeas, setGeneralIdeas] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const linkedin = localStorage.getItem('linkedin-content');
        const reels = localStorage.getItem('reels-content');
        const instagram = localStorage.getItem('instagram-content');
        const ideas = localStorage.getItem('general-ideas');

        if (linkedin) setLinkedinContent(JSON.parse(linkedin));
        if (reels) setReelsContent(JSON.parse(reels));
        if (instagram) setInstagramContent(JSON.parse(instagram));
        if (ideas) setGeneralIdeas(JSON.parse(ideas));
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('linkedin-content', JSON.stringify(linkedinContent));
  }, [linkedinContent]);

  useEffect(() => {
    localStorage.setItem('reels-content', JSON.stringify(reelsContent));
  }, [reelsContent]);

  useEffect(() => {
    localStorage.setItem('instagram-content', JSON.stringify(instagramContent));
  }, [instagramContent]);

  useEffect(() => {
    localStorage.setItem('general-ideas', JSON.stringify(generalIdeas));
  }, [generalIdeas]);

  // LinkedIn CRUD
  const addLinkedinContent = (content) => {
    const newContent = {
      ...content,
      id: uuidv4(),
      createdDate: new Date().toISOString(),
    };
    setLinkedinContent([...linkedinContent, newContent]);
    return newContent;
  };

  const updateLinkedinContent = (id, updatedContent) => {
    setLinkedinContent(
      linkedinContent.map((item) =>
        item.id === id ? { ...item, ...updatedContent } : item
      )
    );
  };

  const deleteLinkedinContent = (id) => {
    setLinkedinContent(linkedinContent.filter((item) => item.id !== id));
  };

  // Reels CRUD
  const addReelsContent = (content) => {
    const newContent = {
      ...content,
      id: uuidv4(),
      createdDate: new Date().toISOString(),
    };
    setReelsContent([...reelsContent, newContent]);
    return newContent;
  };

  const updateReelsContent = (id, updatedContent) => {
    setReelsContent(
      reelsContent.map((item) =>
        item.id === id ? { ...item, ...updatedContent } : item
      )
    );
  };

  const deleteReelsContent = (id) => {
    setReelsContent(reelsContent.filter((item) => item.id !== id));
  };

  // Instagram CRUD
  const addInstagramContent = (content) => {
    const newContent = {
      ...content,
      id: uuidv4(),
      createdDate: new Date().toISOString(),
    };
    setInstagramContent([...instagramContent, newContent]);
    return newContent;
  };

  const updateInstagramContent = (id, updatedContent) => {
    setInstagramContent(
      instagramContent.map((item) =>
        item.id === id ? { ...item, ...updatedContent } : item
      )
    );
  };

  const deleteInstagramContent = (id) => {
    setInstagramContent(instagramContent.filter((item) => item.id !== id));
  };

  // General Ideas CRUD
  const addGeneralIdea = (idea) => {
    const newIdea = {
      ...idea,
      id: uuidv4(),
    };
    setGeneralIdeas([...generalIdeas, newIdea]);
    return newIdea;
  };

  const updateGeneralIdea = (id, updatedIdea) => {
    setGeneralIdeas(
      generalIdeas.map((item) =>
        item.id === id ? { ...item, ...updatedIdea } : item
      )
    );
  };

  const deleteGeneralIdea = (id) => {
    setGeneralIdeas(generalIdeas.filter((item) => item.id !== id));
  };

  return (
    <ContentContext.Provider
      value={{
        linkedinContent,
        addLinkedinContent,
        updateLinkedinContent,
        deleteLinkedinContent,
        reelsContent,
        addReelsContent,
        updateReelsContent,
        deleteReelsContent,
        instagramContent,
        addInstagramContent,
        updateInstagramContent,
        deleteInstagramContent,
        generalIdeas,
        addGeneralIdea,
        updateGeneralIdea,
        deleteGeneralIdea,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}