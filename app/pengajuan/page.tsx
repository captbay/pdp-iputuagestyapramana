"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postPengajuan } from "@/util/actions";

const Pengajuan = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tanggalLahir: "",
    statusPerkawinan: "",
    dataPasangan: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nik || !formData.tanggalLahir) {
      alert("Mohon lengkapi semua kolom");
      return;
    }

    try {
      const response = await postPengajuan(formData);
      if (response) {
        router.push("/");
      } else {
        // alert
        alert("Gagal mengajukan kredit");
        console.error("Gagal mengajukan kredit");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Pengajuan Kredit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-gray-950"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NIK</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-gray-950"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-gray-950"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status Perkawinan</label>
          <input
            type="text"
            name="statusPerkawinan"
            value={formData.statusPerkawinan}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-gray-950"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data Pasangan</label>
          <input
            type="text"
            name="dataPasangan"
            value={formData.dataPasangan}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-gray-950"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Pengajuan;
