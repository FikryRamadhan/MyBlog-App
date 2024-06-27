const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Documentation API",
            version: "1.0.0",
            description:
                "Ini Adalah Dokumentasi API dengan swagger",
            contact: {
                name: "Fikry Ramadhan",
                url: "https://fikryramadhan.vercel.app",
                email: "fikryramadhan572@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:4000/",
            },
        ],
    },
    apis: ["./route/*.js"],
};

module.exports = options