import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateNextBirthdays() {
  const today = new Date();

  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1; // Janeiro = 0

  const aniversarios = await prisma.aniversario.findMany();

  for (const aniversario of aniversarios) {
    const birthdayDate = new Date(aniversario.data_nascimento);

  
    const nextBirthdayYear =
      birthdayDate.getFullYear() +
      (birthdayDate.getMonth() + 1 < todayMonth ||
      (birthdayDate.getMonth() + 1 === todayMonth &&
        birthdayDate.getDate() < todayDate)
        ? 1
        : 0);

    const nextBirthday = new Date(
      nextBirthdayYear,
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    );

    
    await prisma.aniversario.update({
      where: { id: aniversario.id },
      data: { proximo_aniversario: nextBirthday },
    });
  }

  console.log("Próximos aniversários atualizados.");
}

export default updateNextBirthdays;
