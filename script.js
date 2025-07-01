// Zé Boost power instagram - Static Website JavaScript

// Service pricing data
const servicePricing = {
    'seguidores-br': {
        name: 'Seguidores Brasileiros',
        price: 0.05,
        min: 100,
        max: 10000,
        unit: 'seguidores'
    },
    'curtidas': {
        name: 'Curtidas',
        price: 0.02,
        min: 50,
        max: 5000,
        unit: 'curtidas'
    },
    'views-reels': {
        name: 'Visualizações Reels',
        price: 0.01,
        min: 1000,
        max: 100000,
        unit: 'visualizações'
    },
    'seguidores-organicos': {
        name: 'Seguidores Orgânicos',
        price: 0.15,
        min: 50,
        max: 2000,
        unit: 'seguidores'
    }
};

// DOM elements
let loginModal, orderModal, registerModal;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap modals
    loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize smooth scrolling for navigation
    initializeSmoothScrolling();
