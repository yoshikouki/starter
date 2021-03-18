import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // const post = await prisma.post.update({
  //   where: { id: 2 },
  //   data: { published: true },
  // })
  // console.log(post)

  console.log('Create user ----------------------------------------------------------------')
  for (let i = 1;i<=10;i++) {
    const email = `user-${i}@prisma.io`
    const name = `user-${i}`
    await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
    await prisma.post.create({
      data: {
        title: 'Prisma make databases easy',
        author: {
          connect: { email: email},
        },
      },
    })
  }

  console.log('Show all users ----------------------------------------------------------------')
  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, {depth: null})
  const allPosts = await prisma.post.findMany()
  console.dir(allPosts, {depth: null})
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
