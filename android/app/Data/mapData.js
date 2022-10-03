const Images = [
    { image: require('../assets/images/la_kasbah.jpg') },
    // { image: "../assets/banners/food-banner1.jpg" },
    // { image: "../assets/banners/food-banner1.jpg" },
    // { image: "../assets/banners/food-banner1.jpg" },
    // { image: "../assets/banners/food-banner1.jpg" }
    { image: require("../assets/images/elhalfaouine.png") },
    { image: require("../assets/images/dar-lasram.webp") },
    { image: require("../assets/images/zaytouna.png") },
    { image: require("../assets/images/bebbhar.png") },
];

export const markers = [
    {
        coordinate: {
            latitude: 36.799166282191266, 
            longitude: 10.175630475151,
        },
        title: "Beb Bhar",
        description: "Des portes (Bab) permettaient de rentrer et sortir de la ville",
        image: Images[4].image,
        rating: 4,
        reviews: 178,
    },
    {
        coordinate: {
            latitude: 36.802996977656115,
            longitude: 10.165610066850947,
        },
        title: "La Kasbah",
        description: " C’est le centre du gouvernement",
        image: Images[0].image,
        rating: 4,
        reviews: 99,
    },
    {
        coordinate: {
            latitude: 36.80843447914783, 
            longitude: 10.166387223491125,
        },
        title: "Souk El Halfaouine",
        description: "L’endroit d’un mélange de couleurs, d’odeurs et de goûts divers",
        image: Images[1].image,
        rating: 5,
        reviews: 102,
    },
    {
        coordinate: {
            latitude: 36.802187998517276, 
            longitude: 10.168075097036773,
        },
        title: "Dar Lasrem",
        description: "Un palais historique situé dans la vieille ville de Tunis en Tunisie",
        image: Images[2].image,
        rating: 3,
        reviews: 220,
    },
    {
        coordinate: {
            latitude: 36.797325605955855, 
            longitude: 10.17123568538166,
        },
        title: "Mosquée Zitouna",
        description: "Une référence architecturale et théologique.",
        image: Images[3].image,
        rating: 4,
        reviews: 48,
    },
    
];