// seatingData.ts
export type Section = {
  id: string;
  label: string;
  zone: string;
  price: number;
  available: number;
};

function priceForZone(zone: string) {
  switch (zone) {
    case "Club":
      return 295;
    case "Lower":
      return 175;
    case "Mid":
      return 125;
    case "Upper":
      return 115;
    default:
      return 100;
  }
}

// Build sections that match the screenshot numbering style:
// Outer ring: 501..554 (54 sections)
// Next ring: 401..?? (36 sections) - we'll call them 400s
// Middle: 200s (green), Inner: 100s (pink)
export const seatingSections: Section[] = (() => {
  const out: Section[] = [];

  // Outer 500s (54)
  for (let i = 501; i <= 554; i++) {
    out.push({
      id: `S${i}`,
      label: `${i}`,
      zone: "Upper",
      price: priceForZone("Upper"),
      available: Math.floor(Math.random() * 12),
    });
  }

  // 400s (36)
  for (let i = 401; i <= 436; i++) {
    out.push({
      id: `S${i}`,
      label: `${i}`,
      zone: "Mid",
      price: priceForZone("Mid"),
      available: Math.floor(Math.random() * 14),
    });
  }

  // 200s (28)
  for (let i = 201; i <= 228; i++) {
    out.push({
      id: `S${i}`,
      label: `${i}`,
      zone: "Lower",
      price: priceForZone("Lower"),
      available: Math.floor(Math.random() * 10),
    });
  }

  // 100s (inner, 24)
  for (let i = 101; i <= 124; i++) {
    out.push({
      id: `S${i}`,
      label: `${i}`,
      zone: "Club",
      price: priceForZone("Club"),
      available: Math.floor(Math.random() * 6),
    });
  }

  return out;
})();
