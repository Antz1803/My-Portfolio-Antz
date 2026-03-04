import { HomeData } from '../Models/HomeModel';

export const useHomeController = () => {
    const viewModel = HomeData; 
    
    return {
        viewModel 
    };
};