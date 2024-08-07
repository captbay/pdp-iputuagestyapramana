"use server";

import { Pengajuan } from "@/app/approval/page";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function getPengajuan() {
  const pengajuan = await prisma.pengajuan.findMany({
    include: {
      konsumen: true,
    },
  });
  return pengajuan;
}

export async function postPengajuan({
  nama,
  nik,
  tanggalLahir,
  statusPerkawinan,
  dataPasangan,
}: {
  nama: string;
  nik: string;
  tanggalLahir: string;
  statusPerkawinan: string;
  dataPasangan: string;
}) {
  const newKonsumen = await prisma.konsumen.create({
    data: {
      nama: nama,
      nik: nik,
      tanggalLahir: new Date(tanggalLahir),
      statusPerkawinan: statusPerkawinan,
      dataPasangan: dataPasangan,
    },
  });

  const newPengajuan = await prisma.pengajuan.create({
    data: {
      konsumenId: newKonsumen.id,
      marketingId: 1,
      approvalStatus: false,
      tanggalPengajuan: new Date(),
    },
  });

  return newKonsumen && newPengajuan;
}
