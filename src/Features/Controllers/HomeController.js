import { useState, useEffect } from 'react';
import { HomeData } from '../Models/HomeModel';

export const useHomeController = () => {
    // 1. Initialize projects state, trying to pull saved likes from localStorage first
    const [projects, setProjects] = useState(() => {
        const savedLikes = localStorage.getItem('portfolio_project_likes');
        if (savedLikes) {
            const parsedLikes = JSON.parse(savedLikes);
            // Map the saved likes back onto your base HomeData project list
            return HomeData.projects.map((project, index) => ({
                ...project,
                // Match by an explicit id, or fall back to array position index
                likes: parsedLikes[project.id || index] ?? (project.likes || 0)
            }));
        }
        return HomeData.projects;
    });

    // 2. The click handler function that increments the counter and saves it
    const handleLikeProject = (projectId) => {
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.map((project, index) => {
                const identifier = project.id || index;
                if (identifier === projectId) {
                    return { ...project, likes: (project.likes || 0) + 1 };
                }
                return project;
            });

            // Save the updated counts to localStorage so they survive a refresh
            const likesMapping = {};
            updatedProjects.forEach((project, index) => {
                likesMapping[project.id || index] = project.likes || 0;
            });
            localStorage.setItem('portfolio_project_likes', JSON.stringify(likesMapping));

            return updatedProjects;
        });
    };

    // 3. Assemble the updated state back into the viewModel format your UI expects
    const viewModel = {
        ...HomeData,
        projects: projects
    };

    return {
        viewModel,
        handleLikeProject // Exposed so Home.jsx can call it on click
    };
};