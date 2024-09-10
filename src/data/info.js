export default {
    home: "Harry James Potter is a half-blood wizard and the only son of James and Lily Potter. He is the only known person to have survived the curse of Avada Kedavra, doing so on two occasions. Both times the curse was cast by Lord Voldemort.",
    characterPage: "The world of Harry Potter is filled with a vast array of magical beings, each with their own unique stories, backgrounds, and qualities. From the brave students of Gryffindor to the cunning members of Slytherin, the curious minds of Ravenclaw, and the loyal hearts of Hufflepuff, every character has a role to play in the saga. Explore the diverse characters that make up this magical universe. Whether you’re searching for your favorite wizard, witch, or magical creature, or discovering new characters along the way, our character section allows you to dive deep into their histories, personalities, and affiliations. Use the filters below to find characters based on their house, species, gender, and more. Begin your journey through the wizarding world and uncover the stories of those who shape it.",
    descriptionHouse: {
        house: {
            description: "Students belonging to each house do not necessarily have all the qualities that characterize each one of them. There are cases in which the Sorting Hat receives students who make it doubt which house they should be assigned to. If the Hat hesitates for more than five minutes, that student is called a Hatstall."
        },
        Gryffindor: {
            description: "Gryffindor House was founded by the famous wizard Godric Gryffindor. Godric only accepted witches and wizards who had bravery, goodwill, courage and chivalry into his house, as these are the qualities of a true Gryffindor. The house colours are gold and scarlet and its symbol is a lion. The most prized relic of the house is the sword of Godric Gryffindor, belonging, as its name suggests, to the founder of the house. Students of this house spend most of their time in Gryffindor Tower, located on the seventh floor of Hogwarts Castle."
        },
        Hufflepuff: {
            description: "The Hufflepuff Common Room is located in a cellar in the same underground passage as the kitchen. Initially, Hufflepuff sought students who simply wanted to belong to that house, although nowadays it seeks loyal, honest students who are not afraid of hard work. The founder is none other than the witch Helga Hufflepuff, a childhood friend of Rowena Ravenclaw. Helga was a very noble, friendly witch and the main driving force behind Hogwarts accepting Muggle-born students. The main relic of the house is Helga Hufflepuff's cup. The symbol of the house is a black badger and its representative colors are yellow and charcoal black."
        },
        Ravenclaw:{
            description: "Ravenclaw House is located in a tower in the west wing of the castle. At the entrance is a statue shaped like an eagle that tells riddles and only lets you in if you solve them. Its colours are blue and bronze. Ravenclaw seeks creative, curious students who always look for the answer. It was founded by the witch, born in the glens of Scotland, Rowena Ravenclaw. She is supposedly the main inventor of the name, location and format of Hogwarts. She is also the cause of the stairs moving. Her main relic is Rowena Ravenclaw's diadem. The symbol of the house is the eagle, although in some versions of the crest it is a raven."
        },
        Slytherin:{
            description: `Slytherin House is characterized primarily by ambition and cunning. It was founded by the wizard Salazar Slytherin. The Common Room is located in the dungeons, passing through a series of numerous underground passages. Possibly it is reached through the Hogwarts Hall. Specifically it is located under the Black Lake, making the common room cold and with a greenish hue, since there are windows that look out onto the waters. It is accessed through a highly concealed door in a stone wall, saying a password required. The only known one is "Pureblood". Its main relic is Salazar Slytherin's locket. The representative animal is the snake, its colors are green and silver and the element is water, associated with cunning and coldness.`
        }
    },

    founders: {
        GodricGryffindor: {
            description: "The founder of Gryffindor house. A righteous man, he believed that any child who showed magical abilities before the age of 11 should be able to attend Hogwarts. He chose as members of his house those who demonstrated valor, courage and bravery. Corresponds to the element of fire."
        },
        HelgaHufflepuff: {
            description: "The founder of Hufflepuff house. She was a kind and warm woman. The values ​​that a person must possess to be sorted into the Hufflepuff house are loyalty, patience, and hard work above all else. He is also known to have given house elves work at Hogwarts. It corresponds to the element of earth."
        },
        RowenaRavenclaw:{
            description: "The founder of Ravenclaw house, she was a strong and intelligent woman. Intellect is a very valuable asset for students of Ravenclaw house. Because of this, Rowena wanted to make Hogwarts one of the finest in the land, teaching children with the highest intelligence. It corresponds to the element of air."
        },
        SalazarSlytherin:{
            description: `The founder of Slytherin house. A shrewd man, he is not unlike many of the students he took into his home. He firmly believed that only pureblood wizards (i.e. those who have a mother and father from wizarding families) should be allowed to attend Hogwarts and that was why Slytherin only accepted purebloods into this house. Not long after, Slytherin caused a huge dispute with the other founders, and that eventually caused a permanent rift with Gryffindor, leading to Slytherin's departure from the school. Before leaving, however, he created the Chamber of Secrets, with a huge statue of himself and a horrible monster. Corresponds to the element of water.`
        }
    },
    products: [
        {
            id: 1,
            name: "Ollivanders",
            category: "Wands",
            price: 29.99,
            house: "Gryffindor",
            img: "https://th.bing.com/th?q=Ollivander%20s%20Ash%20Wand%20Universal%20Wizarding%20World%20Of%20Harry%20Potter%20Magic%20Red%20Brown&w=400&h=400&c=7&pid=1.7&adlt=moderate&t=1",
            description: "Ollivanders offers high-quality magical wands, each carefully selected for each wizard. This wand, associated with Gryffindor, is made with exceptional materials, ensuring power and durability. Perfect for young and experienced wizards looking for a reliable and powerful wand. With Ollivanders, you'll find the wand that chooses you."
        },
        {
            id: 2,
            name: "Honeydukes",
            category: "Sweets",
            price: 5.99,
            house: "Hufflepuff",
            img: "https://i.pinimg.com/564x/1a/47/ac/1a47ac805941fa69f432e5b0a7be319f.jpg",
            description: "Honeydukes is known for its delicious magical sweets. This special offer, associated with Hufflepuff, includes a variety of treats that will delight any wizard. Ideal for gifting or enjoying at any time, Honeydukes products are irresistible and perfect for sweet lovers."
        },
        {
            id: 3,
            name: "Madam Malkin's",
            category: "Clothes",
            discount: 15,
            price: 49.99,
            house: "Ravenclaw",
            img: "https://fastly.4sqi.net/img/general/600x600/3350979_WIjHWOXC6x3YFLD0fyuHnvggAQHwwLPDOvNDpgIlLSE.jpg",
            description: "Madam Malkin's offers high-quality clothing for wizards. This set, with a 15% discount, is ideal for Ravenclaw students. Made with top-notch materials, it guarantees comfort and style. Perfect for formal events and daily use, this set is an excellent addition to any wizard's wardrobe."
        },
        {
            id: 4,
            name: "Flourish and Blotts",
            category: "Books",
            price: 15.99,
            house: "Slytherin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa9dK6nGPOzPU0ODIFW5mSPzY1KDB0pu7jQ&s",
            description: "Flourish and Blotts is the preferred bookstore for wizards. This book, associated with Slytherin, offers advanced magical knowledge. Ideal for students and experienced wizards, its content is valuable and educational. An excellent addition to any collection, this book is a must-have for those seeking to expand their magical knowledge."
        },
        {
            id: 5,
            name: "Weasleys' Wizard Wheezes",
            category: "Sweets",
            price: 12.99,
            house: "Gryffindor",
            img: "https://media.wdwnt.com/2023/04/putty-1.jpg",
            description: "Weasleys' Wizard Wheezes offers a variety of magical and fun sweets. This package, ideal for Gryffindor followers, includes unique treats that will surprise and delight. Perfect for any occasion, these sweets are a fantastic choice for those seeking fun and flavor in every bite."
        },
        {
            id: 6,
            name: "Eeylops Owl Emporium",
            category: "Wands",
            discount: 15,
            price: 20.00,
            house: "Ravenclaw",
            img: "https://i.ebayimg.com/images/g/STQAAOSwzEtlElsS/s-l400.jpg",
            description: "Eeylops Owl Emporium presents this magical wand with a 15% discount. Ideal for Ravenclaw wizards, this wand is made with high-quality materials, ensuring exceptional performance. Perfect for precise and powerful spells, this wand is an excellent choice for wizards of all levels."
        },
        {
            id: 7,
            name: "Slug & Jiggers Apothecary",
            category: "Potions",
            price: 18.50,
            house: "Slytherin",
            img: "https://static.wikia.nocookie.net/oneminuteago/images/e/e5/Slugjigwiki.jpg",
            description: "Slug & Jiggers Apothecary offers this magical potion, essential for any serious wizard. Associated with Slytherin, this potion is made with the finest ingredients and is perfect for a variety of magical uses. Ideal for experiments and advanced studies, it is a must-have addition to any potion collection."
        },
        {
            id: 8,
            name: "Quality Quidditch Supplies",
            category: "Clothes",
            price: 35.00,
            house: "Hufflepuff",
            img: "https://cinereplicas.eu/cdn/shop/products/QuidditchSweater-Hufflepuff-Product_1-4895205608832_grande.jpg?v=1656482752",
            description: "Quality Quidditch Supplies presents this Quidditch apparel, perfect for Hufflepuff followers. Made with durable and comfortable materials, it is ideal for training and matches. With an attractive and functional design, this apparel is an excellent choice for any Quidditch enthusiast who wants to represent their house with pride."
        },
        {
            id: 9,
            name: "Magical Menagerie",
            category: "Wands",
            price: 22.75,
            house: "Gryffindor",
            img: "https://thefilmcell.com/cdn/shop/products/Harry-Potter-Character-Wands.jpg?v=1578331169",
            description: "Magical Menagerie offers this magical wand with a 15% discount. Associated with Gryffindor, this wand is designed to provide powerful and reliable performance. Perfect for young and experienced wizards, it is an excellent addition to any wand collection, ensuring precise and powerful spells."
        },
        {
            id: 10,
            name: "Borgin and Burkes",
            category: "Books",
            discount: 10,
            price: 45.99,
            house: "Slytherin",
            img: "https://image-cdn.neatoshop.com/styleimg/22944/none/black/default/204342-20.jpg",
            description: "Borgin and Burkes offers this rare and valuable book, with a 10% discount. Perfect for Slytherin followers, this book contains dark and advanced magical knowledge. Ideal for intensive studies and magical explorations, it is a must-have addition to any magical library."
        },
        {
            id: 11,
            name: "The Leaky Cauldron",
            category: "Potions",
            price: 10.00,
            house: "Hufflepuff",
            img: "https://i.ebayimg.com/images/g/94QAAOSw8mJh3D7a/s-l400.jpg",
            description: "The Leaky Cauldron offers this magical potion, perfect for any aspiring potion master. Associated with Hufflepuff, this potion is made from high-quality ingredients and is ideal for various magical uses. Whether for experimentation or regular use, this potion is an essential addition to any collection."
        },
        {
            id: 12,
            name: "Florean Fortescue's Ice Cream Parlour",
            category: "Sweets",
            price: 7.50,
            house: "Ravenclaw",
            img: "https://www.insideuniversal.net/wp-content/uploads/2024/03/Photo-Mar-25-2024-2-56-39-PM-scaled-e1711483882203.jpg",
            description: "Florean Fortescue's Ice Cream Parlour offers delightful and magical ice cream treats. Associated with Ravenclaw, these ice creams are not only delicious but also creatively designed to bring a touch of magic to every bite. Perfect for a treat on a hot day or a magical celebration."
        },
        {
            id: 13,
            name: "Twilfitt and Tatting's",
            category: "Clothes",
            discount: 20,
            price: 55.00,
            house: "Slytherin",
            img: "https://ih1.redbubble.net/image.1527922733.4931/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
            description: "Twilfitt and Tatting's offers high-end clothing for discerning wizards. With a 20% discount, this set is perfect for Slytherin students. Crafted from premium materials, it combines style and comfort, making it ideal for formal events and daily wear. A must-have addition to any wardrobe, representing elegance and sophistication."
        },
        {
            id: 14,
            name: "Gambol and Japes",
            category: "Sweets",
            price: 14.99,
            house: "Gryffindor",
            img: "https://wandw.wdfiles.com/local--files/location:k-2-3/Interior_01.jpg",
            description: "Gambol and Japes offers an assortment of magical sweets, perfect for Gryffindor enthusiasts. These treats are not only delicious but also come with fun magical effects, making them a hit at any gathering. Ideal for those looking to add a bit of excitement and flavor to their sweet collection."
        },
        {
            id: 15,
            name: "The Magical Menagerie",
            category: "Wands",
            price: 19.99,
            discount: 15,
            house: "Hufflepuff",
            img: "https://cdn.waterstones.com/images/00209004-400x400.jpeg",
            description: "The Magical Menagerie presents this finely crafted wand, perfect for Hufflepuff students. Made with high-quality materials, it ensures excellent performance for all types of spells. Ideal for both beginners and experienced wizards, this wand is a reliable tool for any magical endeavor."
        }
    ]
    ,
    
    characters: [
        {
            id: "nombre del personaje",
            image: "url de la imagen"
        },
    ]
}


