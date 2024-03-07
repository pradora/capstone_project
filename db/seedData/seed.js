// seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createIfNotExists = require("./createIfNotExists.js");
const hashThing = require("./hashThing.js")

const main = async () => {
    const hashedPassword = await hashThing("password123");
    const users = [
            
        {
            username: "toni",
            email: "toni@toni.com",
            password: hashedPassword,
            admin: true,
            // shippingAddress
            // paymentInformation
            // orders
            // Cart
            // CartItem
            // Token
        },
        {
            username: "new",
            email: "new@toni.com",
            password: hashedPassword,
            admin: false,
            // shippingAddress
            // paymentInformation
            // orders
            // Cart
            // CartItem
            // Token
        },
           
          ];
    
          for (const user of users) {
            await createIfNotExists("user", user);
          }
    // Products data
    const products = [
      {
        "name": "Platinum Diamond Engagement Ring",
        "description": "A stunning platinum engagement ring featuring a brilliant-cut diamond. The elegant design makes it a perfect choice for a proposal or special occasion.",
        "price": 2500,
        "image": "image-url",
        "class": "Ring",
        "stock": 5
    },
    {
        "name": "Pearl Stud Earrings",
        "description": "These classic stud earrings feature lustrous pearls set in sterling silver. They are perfect for adding a touch of elegance to any ensemble.",
        "price": 150,
        "image": "image-url",
        "class": "Earrings",
        "stock": 10
    },
    {
        "name": "Rose Gold Diamond Bangle Bracelet",
        "description": "A chic rose gold bangle bracelet with a sparkling diamond accent. This bracelet adds a touch of glamour to any outfit.",
        "price": 800,
        "image": "image-url",
        "class": "Bracelet",
        "stock": 3
    },
    // {
    //     "name": "Stainless Steel Analog Watch",
    //     "description": "A stylish stainless steel analog watch with a leather strap. This watch is perfect for everyday wear and adds a touch of sophistication to any outfit.",
    //     "price": 300,
    //     "image": "image-url",
    //     "class": "Watch",
    //     "stock": 6
    // },
    // {
    //     "name": "18K Gold Sapphire Pendant Necklace",
    //     "description": "This stunning 18K gold necklace features a vibrant sapphire pendant. The rich blue hue of the sapphire adds a pop of color to any look.",
    //     "price": 1200,
    //     "image": "image-url",
    //     "class": "Necklace",
    //     "stock": 0
    // },
    // {
    //     "name": "White Gold Brushed Wedding Band",
    //     "description": "A classic white gold wedding band with a modern brushed finish. This ring is timeless and symbolizes eternal love.",
    //     "price": 600,
    //     "image": "image-url",
    //     "class": "Ring",
    //     "stock": 7
    // },
    // {
    //     "name": "Sterling Silver Diamond Hoop Earrings",
    //     "description": "These sterling silver hoop earrings feature sparkling diamond accents, adding a touch of glamour to any look.",
    //     "price": 450,
    //     "image": "image-url",
    //     "class": "Earrings",
    //     "stock": 4
    // },
    // {
    //     "name": "Rose Gold Infinity Bracelet",
    //     "description": "A delicate rose gold bracelet featuring an infinity symbol. This bracelet is a beautiful symbol of eternal love and makes a meaningful gift.",
    //     "price": 250,
    //     "image": "image-url",
    //     "class": "Bracelet",
    //     "stock": 9
    // },
    // {
    //     "name": "Emerald Tennis Bracelet",
    //     "description": "This stunning tennis bracelet features vibrant emerald gemstones set in a classic design. It's a statement piece that adds elegance to any look.",
    //     "price": 1500,
    //     "image": "image-url",
    //     "class": "Bracelet",
    //     "stock": 7
    // },
    // {
    //     "name": "White Gold Diamond Tennis Bracelet",
    //     "description": "This exquisite diamond tennis bracelet is crafted in white gold. It features a row of dazzling diamonds that sparkle with every movement.",
    //     "price": 3000,
    //     "image": "image-url",
    //     "class": "Bracelet",
    //     "stock": 3
    // },
    // {
    //     "name": "Yellow Gold Floral Fashion Ring",
    //     "description": "Add a pop of color to your look with this yellow gold fashion ring. It features a unique floral design that is both stylish and eye-catching.",
    //     "price": 200,
    //     "image": "image-url",
    //     "class": "Ring",
    //     "stock": 8
    // },

    // {
    //     "name": "Turquoise Drop Earrings",
    //     "description": "These beautiful drop earrings feature vibrant turquoise gemstones. They add a pop of color to any outfit and are perfect for summer.",
    //     "price": 180,
    //     "image": "image-url",
    //     "class": "Earrings",
    //     "stock": 6
    // },
    // {
    //     "name": "Hammered Texture Cuff Bracelet",
    //     "description": "This cuff bracelet features a unique hammered texture that adds a touch of edge to any look. It's a statement piece that is sure to turn heads.",
    //     "price": 80,
    //     "image": "image-url",
    //     "class": "Bracelet",
    //     "stock": 2
    // },
    // {
    //     "name": "Ruby and Diamond Gold Necklace",
    //     "description": "This exquisite necklace features stunning ruby and diamond gemstones set in yellow gold. It's a luxurious piece that is sure to make a statement.",
    //     "price": 2000,
    //     "image": "image-url",
    //     "class": "Necklace",
    //     "stock": 1
    // },
    
    // {
    //     "name": "Gold Locket Pendant Necklace",
    //     "description": "This gold chain necklace features a beautiful locket pendant. It's a timeless piece that is perfect for keeping",
    //     "price": 500,
    //     "image": "image-url",
    //     "class": "Necklace",
    //     "stock": 3
    // },
    // {
    //     "name": "Amethyst Drop Earrings",
    //     "description": "These stunning drop earrings feature vibrant amethyst gemstones set in white gold. They are perfect for adding a pop of color to any outfit.",
    //     "price": 300,
    //     "image": "image-url",
    //     "class": "Earrings",
    //     "stock": 4
    // },
    // {
    //     "name": "Freshwater Pearl Bracelet",
    //     "description": "This elegant pearl bracelet features lustrous freshwater pearls. It's a classic piece that adds sophistication to any outfit.",
    //     "price": 350,
    //     "image": "image-url",
    //     "class": "Bracelet",
    //     "stock": 7
    // }
    ]

    // more products coming soon
  

  for (const product of products) {
    await createIfNotExists("product", product);
  }


    console.log("Seed data creation complete.");

    await prisma.$disconnect();

} //end of main

main().catch((e) => {
    throw e;
});
