// pages/approve.tsx
"use client";
import { getPengajuan } from "@/util/actions";
import { useEffect, useState } from "react";

export type Pengajuan = {
  id: number;
  konsumen: {
    id: number;
    nama: string;
    nik: string;
    tanggalLahir: Date;
    statusPerkawinan: string;
    dataPasangan: string | null;
    salesDealerId: number | null;
  };
  approvalStatus: boolean;
  tanggalPengajuan: Date;
};

const Approve = () => {
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);

  useEffect(() => {
    const fetchPengajuan = async () => {
      const response = await getPengajuan();
      console.log(response);

      setPengajuanList(response);
    };

    fetchPengajuan();
  }, []);

  const handleApprove = async (id: number) => {
    alert("Fitur ini belum selesai :D perlu waktu nih lagi hehe");

    // try {
    //   await axios.patch(`/api/pengajuan/${id}`);
    //   setPengajuanList((prev) =>
    //     prev.map((pengajuan) =>
    //       pengajuan.id === id
    //         ? { ...pengajuan, approvalStatus: true }
    //         : pengajuan
    //     )
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Approve Pengajuan</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nama Konsumen</th>
            <th className="py-2">Tanggal Pengajuan</th>
            <th className="py-2">Status</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pengajuanList.map((pengajuan) => (
            <tr key={pengajuan.id}>
              <td className="py-2">{pengajuan.konsumen.nama}</td>
              <td className="py-2">
                {new Date(pengajuan.tanggalPengajuan).toLocaleDateString()}
              </td>
              <td className="py-2">
                {pengajuan.approvalStatus ? "Disetujui" : "Belum Disetujui"}
              </td>
              <td className="py-2">
                {!pengajuan.approvalStatus && (
                  <button
                    onClick={() => handleApprove(pengajuan.id)}
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approve;
