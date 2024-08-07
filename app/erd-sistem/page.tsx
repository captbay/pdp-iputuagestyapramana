import PrismaErd from "@/public/prisma-erd.svg";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image
        src={PrismaErd}
        alt="Prisma ERD"
        width={500}
        height={500}
        priority
        className="mx-auto w-screen h-screen"
      />
    </div>
  );
}
