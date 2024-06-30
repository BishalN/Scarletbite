/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient, type User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// TODO: Remove all existing data before seeding also add the ability to rollback the seed data
async function main() {
  // Create Users
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        image: faker.image.avatar(),
        role: i === 0 ? "ADMIN" : "USER",
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: faker.datatype.uuid(),
            access_token: faker.internet.password(),
          },
        },
        sessions: {
          create: {
            sessionToken: faker.datatype.uuid(),
            expires: faker.date.future(),
          },
        },
        pereference: {
          create: {
            currency: faker.finance.currencyCode(),
            cashOnDelivery: faker.datatype.boolean(),
          },
        },
      },
    });
    users.push(user);
  }

  // Create MenuItems
  const menuItems = [];
  for (let i = 0; i < 20; i++) {
    const menuItem = await prisma.menuItem.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        isAvailable: faker.datatype.boolean(),
        thumbnail: faker.image.food(),
      },
    });
    menuItems.push(menuItem);
  }

  // Create Orders
  for (let i = 0; i < 30; i++) {
    const or = await prisma.order.create({
      data: {
        //@ts-ignore
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        // use index to get random status
        status: faker.helpers.arrayElement([
          "PENDING",
          "PREPARING",
          "READY",
          "COMPLETED",
          "CANCELED",
        ]),
        orderItems: {
          create: {
            quantity: faker.number.int({ min: 1, max: 5 }),
            menuItemId:
              // @ts-ignore
              menuItems[faker.number.int({ min: 0, max: menuItems.length - 1 })]
                .id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
