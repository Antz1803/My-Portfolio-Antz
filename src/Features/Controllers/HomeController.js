import { useState, useEffect } from 'react';
import { HomeData } from '../Models/HomeModel';
// 1. Import your working database reference from your config file
import { db } from '../../Firebase/firebaseConfig'; 
import { ref, onValue, runTransaction } from 'firebase/database';

export const useHomeController = () => {
    // Start with the default local hardcoded data array structure
    const [projects, setProjects] = useState(HomeData.projects);

    // ANTI-SPAM: Keep track of whether THIS browser has clicked a button
    const [likedByUser, setLikedByUser] = useState(() => {
        const savedUserLikes = localStorage.getItem('user_liked_projects');
        return savedUserLikes ? JSON.parse(savedUserLikes) : {};
    });

    // 2. Set up a live subscription link directly to your online Database URL
    useEffect(() => {
        const likesRef = ref(db, 'project_likes');
        
        // This triggers automatically every time ANY user across the internet likes a project
        const unsubscribe = onValue(likesRef, (snapshot) => {
            const onlineLikes = snapshot.val() || {};
            
            setProjects(prevProjects => 
                prevProjects.map((project, index) => {
                    const identifier = project.id || index;
                    return {
                        ...project,
                        // Use the real-time cloud number; fall back to 0 if empty
                        likes: onlineLikes[identifier] ?? (project.likes || 0)
                    };
                })
            );
        });

        // Detach the network socket connection when the page unmounts
        return () => unsubscribe();
    }, []);

    // 3. Increment the likes globally using a safe database transaction
    const handleLikeProject = async (projectId) => {
        // Anti-spam safeguard check
        if (likedByUser[projectId]) return;

        const projectLikeRef = ref(db, `project_likes/${projectId}`);

        try {
            // Safe increment transaction prevents concurrent click overrides
            await runTransaction(projectLikeRef, (currentLikes) => {
                return (currentLikes || 0) + 1;
            });

            // Remember that this user voted on this specific machine
            setLikedByUser(prev => {
                const updatedUserLikes = { ...prev, [projectId]: true };
                localStorage.setItem('user_liked_projects', JSON.stringify(updatedUserLikes));
                return updatedUserLikes;
            });
        } catch (error) {
            console.error("Cloud synchronization failed: ", error);
        }
    };

    const viewModel = {
        ...HomeData,
        projects: projects
    };

    return {
        viewModel,
        likedByUser, // Return this so your view can read the visual disabled status
        handleLikeProject
    };
};