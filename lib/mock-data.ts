// Mock data untuk development tanpa koneksi ODK Central

export const mockSubmissions = [
  {
    instanceId: "uuid:mock-001",
    createdAt: "2025-01-10T08:30:00.000Z",
    submitterId: 1,
    submitter: {
      displayName: "22-101 Ahmad Fauzi"
    },
    currentVersion: {
      instanceName: "Yogyakarta Selatan - RT 01"
    },
    reviewState: "received"
  },
  {
    instanceId: "uuid:mock-002",
    createdAt: "2025-01-10T09:15:00.000Z",
    submitterId: 2,
    submitter: {
      displayName: "22-102 Siti Nurhaliza"
    },
    currentVersion: {
      instanceName: "Yogyakarta Timur - RT 02"
    },
    reviewState: "approved"
  },
  {
    instanceId: "uuid:mock-003",
    createdAt: "2025-01-10T10:00:00.000Z",
    submitterId: 3,
    submitter: {
      displayName: "22-103 Budi Santoso"
    },
    currentVersion: {
      instanceName: "Yogyakarta Utara - RT 03"
    },
    reviewState: "hasIssues"
  },
  {
    instanceId: "uuid:mock-004",
    createdAt: "2025-01-10T11:20:00.000Z",
    submitterId: 4,
    submitter: {
      displayName: "22-104 Dewi Lestari"
    },
    currentVersion: {
      instanceName: "Yogyakarta Barat - RT 04"
    },
    reviewState: "edited"
  },
  {
    instanceId: "uuid:mock-005",
    createdAt: "2025-01-10T13:45:00.000Z",
    submitterId: 5,
    submitter: {
      displayName: "22-105 Rizky Pratama"
    },
    currentVersion: {
      instanceName: "Yogyakarta Pusat - RT 05"
    },
    reviewState: "hasIssues"
  },
  {
    instanceId: "uuid:mock-006",
    createdAt: "2025-01-10T14:30:00.000Z",
    submitterId: 6,
    submitter: {
      displayName: "22-106 Maya Kusuma"
    },
    currentVersion: {
      instanceName: "Yogyakarta Selatan - RT 06"
    },
    reviewState: "approved"
  },
  {
    instanceId: "uuid:mock-007",
    createdAt: "2025-01-10T15:00:00.000Z",
    submitterId: 7,
    submitter: {
      displayName: "22-107 Andi Wijaya"
    },
    currentVersion: {
      instanceName: "Yogyakarta Timur - RT 07"
    },
    reviewState: "received"
  },
  {
    instanceId: "uuid:mock-008",
    createdAt: "2025-01-11T08:00:00.000Z",
    submitterId: 8,
    submitter: {
      displayName: "22-108 Lina Permata"
    },
    currentVersion: {
      instanceName: "Yogyakarta Utara - RT 08"
    },
    reviewState: "approved"
  },
  {
    instanceId: "uuid:mock-009",
    createdAt: "2025-01-11T09:30:00.000Z",
    submitterId: 9,
    submitter: {
      displayName: "22-109 Rendra Saputra"
    },
    currentVersion: {
      instanceName: "Yogyakarta Barat - RT 09"
    },
    reviewState: "edited"
  },
  {
    instanceId: "uuid:mock-010",
    createdAt: "2025-01-11T10:15:00.000Z",
    submitterId: 1,
    submitter: {
      displayName: "22-101 Ahmad Fauzi"
    },
    currentVersion: {
      instanceName: "Yogyakarta Pusat - RT 10"
    },
    reviewState: "approved"
  }
];

export const mockSubmissionXML = `<?xml version="1.0" encoding="UTF-8"?>
<data id="shelter_survey">
  <nama_responden>Budi Santoso</nama_responden>
  <alamat>Jl. Mangkubumi No. 123, Yogyakarta</alamat>
  <rt_rw>RT 03 / RW 05</rt_rw>
  <kelurahan>Terban</kelurahan>
  <kecamatan>Gondokusuman</kecamatan>
  <jenis_bangunan>Rumah Permanen</jenis_bangunan>
  <luas_bangunan>75</luas_bangunan>
  <jumlah_penghuni>4</jumlah_penghuni>
  <kondisi_atap>Baik</kondisi_atap>
  <kondisi_dinding>Baik</kondisi_dinding>
  <kondisi_lantai>Baik</kondisi_lantai>
  <sumber_air>PDAM</sumber_air>
  <fasilitas_mck>Ada di dalam</fasilitas_mck>
  <listrik>Ada</listrik>
  <catatan>Bangunan dalam kondisi baik, tidak ada kerusakan berarti</catatan>
  <meta>
    <instanceID>uuid:mock-003</instanceID>
  </meta>
</data>`;
