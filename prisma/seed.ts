import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Buat data konsumen
  const konsumen1 = await prisma.konsumen.create({
    data: {
      nama: 'I Putu Agestya Pramana',
      nik: '1234567890',
      tanggalLahir: new Date('1995-08-01'),
      statusPerkawinan: 'Belum Menikah',
      dataPasangan: null,
    },
  });

  const konsumen2 = await prisma.konsumen.create({
    data: {
      nama: 'Made Ari Sutrisna',
      nik: '0987654321',
      tanggalLahir: new Date('1992-05-12'),
      statusPerkawinan: 'Menikah',
      dataPasangan: 'Ayu Wulan',
    },
  });

  // Buat data marketing
  const marketing1 = await prisma.marketing.create({
    data: {
      nama: 'John Doe',
    },
  });

  const marketing2 = await prisma.marketing.create({
    data: {
      nama: 'Jane Doe',
    },
  });

  // Buat data sales dealer
  const salesDealer1 = await prisma.salesDealer.create({
    data: {
      nama: 'Dealer A',
      konsumen: {
        connect: [{ id: konsumen1.id }, { id: konsumen2.id }],
      },
      marketing: {
        connect: { id: marketing1.id },
      },
    },
  });

  const salesDealer2 = await prisma.salesDealer.create({
    data: {
      nama: 'Dealer B',
      marketing: {
        connect: { id: marketing2.id },
      },
    },
  });

  // Buat data pengajuan
  const pengajuan1 = await prisma.pengajuan.create({
    data: {
      konsumen: {
        connect: { id: konsumen1.id },
      },
      marketing: {
        connect: { id: marketing1.id },
      },
      approvalStatus: true,
      tanggalPengajuan: new Date(),
    },
  });

  const pengajuan2 = await prisma.pengajuan.create({
    data: {
      konsumen: {
        connect: { id: konsumen2.id },
      },
      marketing: {
        connect: { id: marketing2.id },
      },
      approvalStatus: false,
      tanggalPengajuan: new Date(),
    },
  });

  // Buat data dokumen
  await prisma.dokumen.createMany({
    data: [
      {
        pengajuanId: pengajuan1.id,
        jenis: 'KTP',
        url: 'https://example.com/ktp1.pdf',
        statusTTD: true,
      },
      {
        pengajuanId: pengajuan1.id,
        jenis: 'SPK',
        url: 'https://example.com/spk1.pdf',
        statusTTD: true,
      },
      {
        pengajuanId: pengajuan2.id,
        jenis: 'KTP',
        url: 'https://example.com/ktp2.pdf',
        statusTTD: false,
      },
      {
        pengajuanId: pengajuan2.id,
        jenis: 'SPK',
        url: 'https://example.com/spk2.pdf',
        statusTTD: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
