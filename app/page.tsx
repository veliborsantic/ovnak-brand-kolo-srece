import WheelOfFortune from "@/components/WheelOfFortune";

export default function Home() {
  const brands = [
    {
      id: 1,
      name: "Hypo",
      logo: "/hypo.png",
    },
    {
      id: 2,
      name: "Ovnak",
      logo: "/ovnak.png",
    },
    {
      id: 3,
      name: "Septona",
      logo: "/septona.png",
    },
    {
      id: 4,
      name: "Ziaja",
      logo: "/ziaja.png",
    },
  ];

  return (
    <main
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        overflow: "hidden",
      }}
    >
      <WheelOfFortune brands={brands} />
    </main>
  );
}
