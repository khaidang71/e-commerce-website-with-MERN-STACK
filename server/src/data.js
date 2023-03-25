const bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            name: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: true,
        },
        {
            name: 'user',
            email: 'user@gmail.com',
            password: bcrypt.hashSync('12345'),
            isAdmin: false,
        }
    ],
    books: [
        {
            // _id: '632d19ce25f11d695cbaf905',
            title: "Love War Stories",
            slug: "Love-War-Stories",
            image: "https://images-us.bookshop.org/ingram/9781936932252.jpg?height=500&v=v2-31a4ff1b84369f656ca1e840911f65c6",
            pages: 176,
            language: "English",
            dimensions: "5.4 X 0.7 X 7.9 inches",
            publishDate: "2018",
            publisher: "Feminist Press",
            type: "Paperback",
            weight: "0.5 pounds",
            price: 10,
            category: "Short Stories",
            countInStock: 100,
            rating: 4.5,
            numReviews: 10,
            discount: 10,
            reviews: [],
            description: "    Puerto Rican girls are brought up to want one thing: true love. Yet they are raised by women whose lives are marked by broken promises, grief, and betrayal. While some believe that they'll be the ones to finally make it work, others swear not to repeat cycles of violence. This collection documents how these \"love wars\" break out across generations as individuals find themselves caught in the crosshairs of romance, expectations, and community.",
        },
        {
            // _id: '633439c75871ccc49a291a80',
            title: "The Complete Maus: A Survivor's Tale",
            slug: "The-Complete-Maus:-A-Survivor's-Tale",
            image: "https://images-us.bookshop.org/ingram/9780679406419.jpg?height=500&v=v2-4548d3b64a6ae0ce71b99fc206031a31",
            pages: 296,
            language: "English",
            dimensions: "5.4 X 0.7 X 7.9 inches",
            publishDate: "2018",
            publisher: "Pantheon Books",
            type: "Hardcover",
            weight: "1.9 pounds",
            price: 20,
            category: "Historical",
            countInStock: 100,
            discount: 10,
            description: "The definitive edition of the graphic novel acclaimed as \"the most affecting and successful narrative ever done about the Holocaust\" (Wall Street Journal) and \"the first masterpiece in comic book history\" (The New Yorker) - PULITZER PRIZE WINNER - One of Variety's \"Banned and Challenged Books Everyone Should Read\"\nA brutally moving work of art--widely hailed as the greatest graphic novel ever written--Maus recounts the chilling experiences of the author's father during the Holocaust, with Jews drawn as wide-eyed mice and Nazis as menacing cats.\nMaus is a haunting tale within a tale, weaving the author's account of his tortured relationship with his aging father into an astonishing retelling of one of history's most unspeakable tragedies. It is an unforgettable story of survival and a disarming look at the legacy of trauma.",
        },
        {
            // _id: '634fc4aa8b3a6624c86045c2',
            title: "The Seven Moons of Maali Almeida",
            slug: "The-Seven-Moons-of-Maali-Almeida",
            image: "https://images-us.bookshop.org/ingram/9781324064824.jpg?height=500&v=v2-dac5da5e77de6780ab818a2901ee82e1",
            pages: 400,
            language: "English",
            dimensions: "5.51 X 8.26 X 0.95 inches",
            publishDate: "2018",
            publisher: "Feminist Press",
            type: "Paperback",
            weight: "  0.67 pounds",
            price: 18.95,
            category: "Literary",
            countInStock: 100,
            discount: 10,
            description: "Colombo, 1990. Maali Almeida--war photographer, gambler, and closet queen--has woken up dead in what seems like a celestial visa office. His dismembered body is sinking in the serene Beira Lake and he has no idea who killed him. In a country where scores are settled by death squads, suicide bombers, and hired goons, the list of suspects is depressingly long, as the ghouls and ghosts with grudges who cluster round can attest. But even in the afterlife, time is running out for Maali. He has seven moons to contact the man and woman he loves most and lead them to the photos that will rock Sri Lanka.\n\nTen years after his prize-winning novel Chinaman established him as one of Sri Lanka's foremost authors, Shehan Karunatilaka is back with a \"thrilling satire\" (Economist) and rip-roaring state-of-the-nation epic that offers equal parts mordant wit and disturbing, profound truths.",
        },

    ]
}
module.exports = { data };