function generateCodename() {
    const codenames = [
        "The Nightingale",
        "The Kraken",
        "The Phantom",
        "The Shadow",
        "The Falcon",
        "The Viper",
        "The Ghost",
        "The Titan",
        "The Spectre",
        "The Maverick"
    ];

    const randomIndex = Math.floor(Math.random() * codenames.length);
    return codenames[randomIndex];
}

export default generateCodename;