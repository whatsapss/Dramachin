const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mapping shortlink ke link tujuan
const shortlinks = {
    'dramachin': {
        links: [
            'https://www.profitablecpmrate.com/e27w62bx9a?key=26a7db68906946c0aab7c8ab20b8d2f6',
            'https://www.dramachin.com/'
        ],
        og: {
            title: 'Reinkarnasi Dewa Kuno',
            description: 'Klik untuk menonton full epiosode!',
            image: 'https://i.ibb.co.com/mS37jbD/dramachin.jpg'
        }
    },
    'dramabox': {
        links: [
            'https://www.profitablecpmrate.com/e27w62bx9a?key=26a7db68906946c0aab7c8ab20b8d2f6',
            'https://www.dramachin.com/'
        ],
        og: {
            title: 'Reincarnasi Dewa',
            description: 'Klik untuk menonton full movie.',
            image: 'https://i.ibb.co.com/mS37jbD/dramachin.jpg'
        }
    }
};

// Route utama untuk menangani shortlink
app.get('/:shortcode', (req, res) => {
    const shortcode = req.params.shortcode;
    const data = shortlinks[shortcode];

    if (data) {
        const { links, og } = data;

        // Mengirimkan HTML dengan metadata OG
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta property="og:title" content="${og.title}" />
                <meta property="og:description" content="${og.description}" />
                <meta property="og:image" content="${og.image}" />
                <meta property="og:url" content="${req.protocol}://${req.get('host')}/${shortcode}" />
                <title>${og.title}</title>
                <script>
                    const links = ${JSON.stringify(links)};
                    links.forEach(link => window.open(link, '_blank'));
                </script>
            </head>
            <body>
                <h1>${og.title}</h1>
                <p>${og.description}</p>
                <p>Redirecting...</p>
            </body>
            </html>
        `);
    } else {
        res.status(404).send('Shortcode not found.');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
