/* Sugestões para os campos de configuração do formulário de contato.
   Base montada a partir do catálogo do PCPartPicker (pcpartpicker.com) —
   os chipsets/modelos mais usados em builds gamer, cobrindo várias
   gerações (não só lançamentos recentes, já que boa parte do público
   ainda joga em PCs de 3-8 anos). Os campos aceitam texto livre; isto só
   acelera quem tem uma peça comum — a busca ainda é fuzzy (Fuse.js) para
   tolerar erro de digitação. */

export const CPU_OPTIONS = [
  // AMD Ryzen 9000 / 7000 (AM5)
  "Ryzen 9 9950X3D", "Ryzen 9 9950X", "Ryzen 9 9900X3D", "Ryzen 9 9900X",
  "Ryzen 7 9800X3D", "Ryzen 7 9700X", "Ryzen 5 9600X",
  "Ryzen 9 7950X3D", "Ryzen 9 7950X", "Ryzen 9 7900X3D", "Ryzen 9 7900X",
  "Ryzen 7 7800X3D", "Ryzen 7 7700X3D", "Ryzen 7 7700X", "Ryzen 7 7700",
  "Ryzen 5 7600X3D", "Ryzen 5 7600X", "Ryzen 5 7600", "Ryzen 5 7500F",
  // AMD Ryzen 8000G / 5000 (AM4)
  "Ryzen 7 8700G", "Ryzen 5 8600G", "Ryzen 5 8500G", "Ryzen 5 8400F", "Ryzen 7 8700F",
  "Ryzen 9 5950X", "Ryzen 9 5900X", "Ryzen 9 5900XT",
  "Ryzen 7 5800X3D", "Ryzen 7 5800X", "Ryzen 7 5800XT", "Ryzen 7 5700X3D",
  "Ryzen 7 5700X", "Ryzen 7 5700G", "Ryzen 7 5700",
  "Ryzen 5 5600X3D", "Ryzen 5 5600X", "Ryzen 5 5600GT", "Ryzen 5 5600G",
  "Ryzen 5 5600", "Ryzen 5 5500", "Ryzen 5 5500X3D",
  "Ryzen 3 4300G",
  // AMD Ryzen 3000 / 2000 / 1000 (AM4, geração mais antiga)
  "Ryzen 9 3900X", "Ryzen 7 3800X", "Ryzen 7 3800XT", "Ryzen 7 3700X",
  "Ryzen 5 3600X", "Ryzen 5 3600", "Ryzen 5 3500", "Ryzen 5 3400G",
  "Ryzen 3 3300X", "Ryzen 3 3200G", "Ryzen 3 4100",
  "Ryzen 7 2700X", "Ryzen 7 2700", "Ryzen 5 2600X", "Ryzen 5 2600", "Ryzen 3 2200G",
  "Ryzen 5 1600", "Ryzen 5 1600X", "Ryzen 7 1700", "Ryzen 7 1700X", "Ryzen 7 1800X",
  // AMD FX / antigo
  "FX-6300", "FX-8300", "FX-8350", "Athlon 200GE", "Athlon 3000G",
  // AMD workstation/HEDT
  "Threadripper 3970X", "Threadripper 3990X", "Threadripper 3960X",
  // Intel Core Ultra (Arrow Lake, LGA1851)
  "Core Ultra 9 285K", "Core Ultra 7 265K", "Core Ultra 7 265KF", "Core Ultra 7 265F",
  "Core Ultra 5 245K", "Core Ultra 5 245KF", "Core Ultra 5 225F",
  // Intel 12ª/13ª/14ª geração (LGA1700)
  "Core i9-14900K", "Core i9-14900KF", "Core i9-14900KS", "Core i9-13900K", "Core i9-13900KF",
  "Core i7-14700K", "Core i7-14700KF", "Core i7-14700F", "Core i7-13700K", "Core i7-13700KF",
  "Core i5-14600K", "Core i5-14600KF", "Core i5-13600K", "Core i5-13600KF",
  "Core i5-14400F", "Core i5-14400", "Core i5-13400F", "Core i5-13400",
  "Core i3-14100F", "Core i3-13100F",
  "Core i9-12900K", "Core i9-12900KF", "Core i7-12700K", "Core i7-12700KF", "Core i7-12700F",
  "Core i5-12600K", "Core i5-12600KF", "Core i5-12400F", "Core i5-12400",
  "Core i3-12100F", "Core i3-12100",
  // Intel 10ª/11ª geração
  "Core i9-11900K", "Core i7-11700K", "Core i7-11700F", "Core i5-11600K", "Core i5-11400F",
  "Core i9-10900K", "Core i7-10700K", "Core i7-10700F", "Core i5-10600K", "Core i5-10400F",
  "Core i3-10100F",
  // Intel 6ª a 9ª geração (ainda muito comuns)
  "Core i9-9900K", "Core i7-9700K", "Core i5-9600K", "Core i5-9400F",
  "Core i7-8700K", "Core i5-8400", "Core i3-8100",
  "Core i7-7700K", "Core i5-7600K", "Core i3-7100",
  "Core i7-6700K", "Core i5-6600K", "Core i3-6100",
  // Intel antigo / Pentium / Celeron
  "Core i7-4790K", "Core i5-4460", "Core i3-4150", "Pentium G4400", "Pentium G4560",
  "Celeron G4900",
] as const;

export const GPU_OPTIONS = [
  // NVIDIA RTX 50
  "RTX 5090", "RTX 5080", "RTX 5070 Ti", "RTX 5070", "RTX 5060 Ti", "RTX 5060", "RTX 5050",
  // NVIDIA RTX 40
  "RTX 4090", "RTX 4080 SUPER", "RTX 4080", "RTX 4070 Ti SUPER", "RTX 4070 Ti",
  "RTX 4070 SUPER", "RTX 4070", "RTX 4060 Ti", "RTX 4060",
  // NVIDIA RTX 30
  "RTX 3090 Ti", "RTX 3090", "RTX 3080 Ti", "RTX 3080", "RTX 3070 Ti", "RTX 3070",
  "RTX 3060 Ti", "RTX 3060", "RTX 3050",
  // NVIDIA RTX 20
  "RTX 2080 Ti", "RTX 2080 Super", "RTX 2080", "RTX 2070 Super", "RTX 2070",
  "RTX 2060 Super", "RTX 2060",
  // NVIDIA GTX 16 / 10 / 900
  "GTX 1660 Ti", "GTX 1660 Super", "GTX 1660", "GTX 1650 Super", "GTX 1650",
  "GTX 1080 Ti", "GTX 1080", "GTX 1070 Ti", "GTX 1070", "GTX 1060", "GTX 1050 Ti", "GTX 1050",
  "GTX 980 Ti", "GTX 980", "GTX 970", "GTX 960", "GTX 950",
  // AMD Radeon RX 9000
  "RX 9070 XT", "RX 9070", "RX 9070 GRE", "RX 9060 XT",
  // AMD Radeon RX 7000
  "RX 7900 XTX", "RX 7900 XT", "RX 7900 GRE", "RX 7800 XT", "RX 7700 XT", "RX 7600 XT", "RX 7600",
  // AMD Radeon RX 6000
  "RX 6950 XT", "RX 6900 XT", "RX 6800 XT", "RX 6800", "RX 6750 XT", "RX 6700 XT",
  "RX 6650 XT", "RX 6600 XT", "RX 6600", "RX 6500 XT",
  // AMD Radeon RX 500 / 400
  "RX 590", "RX 580", "RX 570", "RX 560", "RX 550", "RX 480", "RX 470", "RX 460",
  // AMD Radeon RX 5000
  "RX 5700 XT", "RX 5700", "RX 5600 XT", "RX 5500 XT",
  // Intel Arc
  "Arc B580", "Arc B570", "Arc A770", "Arc A750", "Arc A580", "Arc A380",
] as const;

export const RAM_OPTIONS = [
  // DDR5
  "8 GB 4800 MHz", "16 GB 4800 MHz", "16 GB 5200 MHz", "16 GB 5600 MHz",
  "16 GB 6000 MHz", "16 GB 6400 MHz",
  "32 GB 4800 MHz", "32 GB 5200 MHz", "32 GB 5600 MHz", "32 GB 6000 MHz", "32 GB 6400 MHz",
  "64 GB 5600 MHz", "64 GB 6000 MHz",
  // DDR4
  "4 GB 2133 MHz", "8 GB 2133 MHz", "8 GB 2400 MHz", "8 GB 2666 MHz", "8 GB 3200 MHz",
  "16 GB 2133 MHz", "16 GB 2400 MHz", "16 GB 2666 MHz", "16 GB 2933 MHz",
  "16 GB 3000 MHz", "16 GB 3200 MHz", "16 GB 3600 MHz",
  "32 GB 2666 MHz", "32 GB 3000 MHz", "32 GB 3200 MHz", "32 GB 3600 MHz",
  "64 GB 3200 MHz", "64 GB 3600 MHz",
  // DDR3 (PCs mais antigos)
  "4 GB 1333 MHz", "8 GB 1333 MHz", "8 GB 1600 MHz", "16 GB 1600 MHz",
] as const;

export const MOBO_OPTIONS = [
  // AMD AM5
  "X870E", "X870", "X670E", "X670", "B850", "B650E", "B650", "A620",
  // AMD AM4
  "X570", "X470", "X370", "B550", "B450", "B350", "A520", "A320",
  // AMD HEDT
  "TRX40", "sTRX4",
  // Intel LGA1851 / 1700
  "Z890", "B860", "Z790", "B760", "H770", "Z690", "B660", "H670", "H610",
  // Intel LGA1200 e mais antigos
  "Z590", "B560", "H570", "H510", "Z490", "B460", "H410",
  "Z390", "Z370", "B365", "B360", "H310",
  "Z270", "B250", "H270", "H110",
] as const;
