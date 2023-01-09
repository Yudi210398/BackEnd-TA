const DUMMYDATA = [
  {
    _id: "b2",
    jenisPakaian: "Kemeja",
    namaPakian: "Kemeja Polos Slimfit Pendek Katun",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: ["S", "M", "L", "XL"],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`,
      `https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`,
    ],
    gambarDanKeterangan: [
      {
        gambar:
          "https://media.istockphoto.com/photos/police-detective-at-the-ready-picture-id534758483?k=20&m=534758483&s=612x612&w=0&h=3L6n9qqGnfxPo_9KlRjGA1iBcT2S5xTcjyGOxFZiveA=",
        ketrangan: "Kemeja Biru",
      },

      {
        gambar:
          "https://media.istockphoto.com/photos/elegant-businessman-picture-id178863550?k=20&m=178863550&s=612x612&w=0&h=Iz3IBKbNwMcK9MMaGTnkDUPC83OYnPp3GrMr6WyhyQc=",
        ketrangan: "Kemeja Putih",
      },
      {
        gambar:
          "https://media.istockphoto.com/photos/beige-male-jeans-shirt-picture-id1386387116?k=20&m=1386387116&s=612x612&w=0&h=vavl_-r31oPsgHvcMIL4YKJuwrYN3tCKirdxZpgeUOI=",
        ketrangan: "Kemeja Coklat",
      },
    ],
  },

  {
    _id: "b4",
    jenisPakaian: "Kemeja",
    namaPakian: "Kemeja Polos Slimfit biru muda Panjang Katun",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: ["S", "M", "L", "XL"],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`,
    ],
    gambarDanKeterangan: [],
  },

  {
    _id: "ba2",
    jenisPakaian: "Batik",
    namaPakian: "Batik Solo",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: [40, 31, 32, 33, 34],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://media.istockphoto.com/photos/malaysian-chinese-mature-woman-boutique-small-business-owner-portrait-picture-id1342158611?k=20&m=1342158611&s=612x612&w=0&h=74sCglcjH8cqpA7zWfXnL8rm6ocbLmaXw8WYsWSD2_0=`,
    ],
    gambarDanKeterangan: [],
  },

  {
    _id: "ba4",
    jenisPakaian: "Batik",
    namaPakian: "Batik Katun",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: ["S", "M", "L", "XL"],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://media.istockphoto.com/photos/full-length-portrait-of-young-man-standing-picture-id185724338?k=20&m=185724338&s=612x612&w=0&h=x84hiLBKr_wVvq_G-2BIC3PRf7wCCgs5RvhOr4B8Lhk=`,
    ],
    gambarDanKeterangan: [],
  },
  {
    _id: "c2",
    jenisPakaian: "Celana",
    namaPakian: "Celana Polos Slimfit Coklat Panjang Jeans",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: [40, 31, 32, 33, 34],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`,
    ],
    gambarDanKeterangan: [],
  },

  {
    _id: "c4",
    jenisPakaian: "Celana",
    namaPakian: "Celana Polos Slimfit Coklat muda Panjang",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: ["S", "M", "L", "XL"],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://media.istockphoto.com/photos/fashion-show-on-a-street-picture-id497081045?k=20&m=497081045&s=612x612&w=0&h=bJfKBtPuAvqMikY2uluszW5WFldZuEAM6SDt23TSz4I=`,
      `https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`,
    ],
    gambarDanKeterangan: [],
  },
  {
    _id: "j2",
    jenisPakaian: "Jas",
    namaPakian: "Jas Polos Slimfit Hitam Panjang",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: [40, 31, 32, 33, 34],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://media.istockphoto.com/photos/young-woman-wearing-a-black-suitusing-the-phone-in-the-office-picture-id667701706?k=20&m=667701706&s=612x612&w=0&h=xQA7YIL1Fw-ZZMRZcMveVwYYzQUwpS_xtbx11LptF9M=`,
    ],
    gambarDanKeterangan: [],
  },

  {
    _id: "j4",
    jenisPakaian: "Jas",
    namaPakian: "Jas Slimfit Hitam muda ",
    stock: 12,
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad odio hic? Eveniet veritatis sed in at blanditiis optio omnis, esse sapiente corrupti voluptas dignissimos!",
    harga: 2500000,
    ukuran: ["S", "M", "L", "XL"],
    reviewProduct: [
      { namaCustomer: "Hana Safira", review: "Keren Sekali Productnya" },
    ],
    gambar: [
      `https://media.istockphoto.com/photos/businessman-smiling-with-arms-crossed-on-white-background-picture-id1364917563?k=20&m=1364917563&s=612x612&w=0&h=wnOTaxd-dom5O5Y7qEyDJBepZFKPK9LXl7TEze4z6wg=`,
    ],
    gambarDanKeterangan: [
      {
        gambar:
          "https://media.istockphoto.com/photos/mens-isolated-jacket-picture-id615251750?k=20&m=615251750&s=612x612&w=0&h=jQJiydECKjLrsaGrxA3Hl3-24vGOdZWlSAQ4NThD7zs=",
        ketrangan: "Jas Abu-Abu",
      },

      {
        gambar:
          "https://media.istockphoto.com/photos/jacket-with-white-shirt-and-tie-on-the-black-mannequin-picture-id827951270?k=20&m=827951270&s=612x612&w=0&h=6bYmxzXKOu4vDtz9ExYF0AjBcIUz3zi4_SigqBSHDSM=",
        ketrangan: "Jas Navy",
      },
      {
        gambar:
          "https://media.istockphoto.com/photos/fashion-for-men-picture-id803752512?k=20&m=803752512&s=612x612&w=0&h=IpVcZ1ZMHrdQcbLHY3P5N8qCu4HFFA_k0yI030sOFOQ=",
        ketrangan: "Jas Hitam",
      },
    ],
  },
];

export default DUMMYDATA;
