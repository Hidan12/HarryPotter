export default {
    home: "Harry James Potter is a half-blood wizard and the only son of James and Lily Potter. He is the only known person to have survived the curse of Avada Kedavra, doing so on two occasions. Both times the curse was cast by Lord Voldemort.",
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
    products: [
        { id: 1, name: "Ollivanders", category: "Wands", price: 29.99, house: "Gryffindor", img: "https://th.bing.com/th?q=Ollivander%20s%20Ash%20Wand%20Universal%20Wizarding%20World%20Of%20Harry%20Potter%20Magic%20Red%20Brown&w=400&h=400&c=7&pid=1.7&adlt=moderate&t=1" },
        { id: 2, name: "Honeydukes", category: "Sweets", price: 5.99, house: "Hufflepuff", img: "https://i.pinimg.com/564x/1a/47/ac/1a47ac805941fa69f432e5b0a7be319f.jpg" },
        { id: 3, name: "Madam Malkin's", category: "Clothes", discount: 15, price: 49.99, house: "Ravenclaw", img: "https://fastly.4sqi.net/img/general/600x600/3350979_WIjHWOXC6x3YFLD0fyuHnvggAQHwwLPDOvNDpgIlLSE.jpg" },
        { id: 4, name: "Flourish and Blotts", category: "Books", price: 15.99, house: "Slytherin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa9dK6nGPOzPU0ODIFW5mSPzY1KDB0pu7jQ&s" },
        { id: 5, name: "Weasleys' Wizard Wheezes", category: "Sweets", price: 12.99, house: "Gryffindor", img: "https://media.wdwnt.com/2023/04/putty-1.jpg" },
        { id: 6, name: "Eeylops Owl Emporium", category: "Wands", discount: 15, price: 20.00, house: "Ravenclaw", img: "https://i.ebayimg.com/images/g/STQAAOSwzEtlElsS/s-l400.jpg" },
        { id: 7, name: "Slug & Jiggers Apothecary", category: "Potions", price: 18.50, house: "Slytherin", img: "https://static.wikia.nocookie.net/oneminuteago/images/e/e5/Slugjigwiki.jpg" },
        { id: 8, name: "Quality Quidditch Supplies", category: "Clothes", price: 35.00, house: "Hufflepuff", img: "https://cinereplicas.eu/cdn/shop/products/QuidditchSweater-Hufflepuff-Product_1-4895205608832_grande.jpg?v=1656482752" },
        { id: 9, name: "Magical Menagerie", category: "Wands", price: 22.75, discount: 15, house: "Gryffindor", img: "https://thefilmcell.com/cdn/shop/products/Harry-Potter-Character-Wands.jpg?v=1578331169" },
        { id: 10, name: "Borgin and Burkes", category: "Books", discount: 10, price: 45.99, house: "Slytherin", img: "https://image-cdn.neatoshop.com/styleimg/22944/none/black/default/204342-20.jpg" },
        { id: 11, name: "The Leaky Cauldron", category: "Potions", price: 10.00, house: "Hufflepuff", img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8f4e42f1-6f53-4304-b3d7-2b00a5985a7e/dhtx1xr-716764ba-c1b3-4ae3-8aba-06806542bc55.jpg/v1/fill/w_400,h_400,q_75,strp/potion_by_inkvision17_dhtx1xr-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhmNGU0MmYxLTZmNTMtNDMwNC1iM2Q3LTJiMDBhNTk4NWE3ZVwvZGh0eDF4ci03MTY3NjRiYS1jMWIzLTRhZTMtOGFiYS0wNjgwNjU0MmJjNTUuanBnIiwiaGVpZ2h0IjoiPD00MDAiLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzhmNGU0MmYxLTZmNTMtNDMwNC1iM2Q3LTJiMDBhNTk4NWE3ZVwvaW5rdmlzaW9uMTctNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.7ZWmz1qwBB-y3kvS1zSzAfubge6L-iRW6mZ6iOwIjjE" },
        { id: 12, name: "Florean Fortescue's Ice Cream Parlour", category: "Sweets", price: 7.50, house: "Ravenclaw", img: "https://images.squarespace-cdn.com/content/v1/6057e99eb4e03d64f1f9153d/1655689103961-C22TQWEX9IRN8MV62C6N/IMG_5750.jpg" },
        { id: 13, name: "Twilfitt and Tatting's", category: "Clothes", discount: 20, price: 55.00, house: "Slytherin", img: "https://ih1.redbubble.net/image.1527922733.4931/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" },
        { id: 14, name: "Gambol and Japes", category: "Sweets", price: 14.99, house: "Gryffindor", img: "https://wandw.wdfiles.com/local--files/location:k-2-3/Interior_01.jpg" },
        { id: 15, name: "The Magical Menagerie", category: "Wands", price: 19.99, house: "Hufflepuff", img: "https://cdn.waterstones.com/images/00209004-400x400.jpeg" }
    ]
    ,
    
    characters: [
        {
            id: "nombre del personaje",
            image: "url de la imagen"
        },
    ]
}


