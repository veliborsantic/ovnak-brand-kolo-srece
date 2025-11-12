"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./WheelOfFortune.module.css";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface WheelOfFortuneProps {
  brands: Brand[];
}

export default function WheelOfFortune({ brands }: WheelOfFortuneProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [randomFact, setRandomFact] = useState<string>("");
  const wheelRef = useRef<HTMLDivElement>(null);

  const anglePerItem = 360 / brands.length;

  // Tekstovi za "Jeste li znali?" po brandu
  const brandFacts: Record<string, string[]> = {
    Ziaja: [
      "Ziaja su osnovali bračni par farmaceuta — Aleksandra i Zenon Ziaja, u Poljskoj 1989. godine!",
      "Prvi proizvod branda Ziaja bio je krema s kozjim mlijekom, napravljena doslovno u kućnom laboratoriju!",
      "Ziaja je i danas obiteljska firma — nije prodana nikome, ni korporacijama ni investitorima.",
      'Naziv "Ziaja" zapravo je prezime bračnog para - osnivača branda!',
      "Ziaja proizvodi se izvoze u više od 60 zemalja svijeta, uključujući Japan, Brazil i Južnu Afriku.",
      "Svake godine Ziaja razvije više od 50 novih formula u vlastitim laboratorijima.",
      "Ziaja kreme i losioni prolaze klinička dermatološka testiranja, kao i lijekovi!",
      "Mnoge Ziaja linije imaju farmaceutski pH od 5,5 — savršeno prilagođen koži.",
      "Linija s kozjim mlijekom i danas je najpoznatija — i stara je preko 30 godina!",
      "Ziaja ima i proizvode s maslinovim uljem, kakaom, morskim algama i kozjim mlijekom – zvuči kao spa tretman u bočici.",
      'Ziaja ima vlastiti spa centar u Poljskoj – "Ziaja Spa" – gdje se koriste isključivo njihovi proizvodi!',
      "Ziaja proizvodi su cruelty-free još prije nego što je to postalo globalni trend.",
      "Ziaja ima veganske linije koje su posebno razvijene za osjetljivu i atopičnu kožu.",
      "Većina Ziaja pakiranja izrađena je od reciklirane plastike, a sve bočice su 100% recyclable.",
      "Ziaja laboratorij koristi vlastitu filtriranu baltičku vodu u proizvodnji!",
      "Neki Ziaja proizvodi sadrže enzime iz morskih algi koji potiču regeneraciju kože – gotovo kao prirodni botoks!",
      "Ziaja testira proizvode na ekstremnim temperaturama i vlažnosti, kako bi bili stabilni u svim klimama.",
      "Ziaja ima i medicinsku dermokozmetiku – liniju Med, koja se koristi kod ekcema i akni.",
      "Ziaja Sun SPF jedan je od najprodavanijih europskih krema za sunčanje po omjeru cijene i kvalitete!",
      "Iako je brand Ziaja globalno poznat, i dalje proizvodi sve u Poljskoj, u svojoj originalnoj tvornici u Gdanjsku.",
    ],
    Septona: [
      "Septona je grčki brend, osnovan u malom obiteljskom pogonu u 1970-ima.",
      'Ime "Septona" dolazi od grčke riječi za "čistoću" i "septičko" – što simbolizira higijenu i njegu.',
      "Septona je počela s proizvodnjom pamučnih štapića i jastučića, a danas ima stotine proizvoda.",
      "Septona proizvodi se izvoze u više od 70 zemalja svijeta!",
      "Septona je vodeći brend higijene u Grčkoj, a konkurira i globalnim gigantima poput Nivee i Johnson's-a!",
      'Septona ima vlastiti laboratorij u kojem razvija sve formule — ništa se ne kupuje "gotovo".',
      "Septona tvornica u Euboei (Evia) jedna je od najvećih u Europi za proizvodnju higijenskih proizvoda.",
      "Septona ima cijelu liniju proizvoda za bebe, pod imenom Calm n' Care.",
      "Septona baby maramice s kamilicom i aloe verom preporučuju i pedijatri u Grčkoj.",
      "Septona koristi pamučno ulje, vitamin E i biljne ekstrakte umjesto sintetičkih mirisa!",
      "Septon brend ima dermatološki testirane formule, čak i za osjetljivu ili atopičnu kožu.",
      "Septona proizvodi ne sadrže alkohol, parabene ni fenoksietanol – čista koža, nula iritacija.",
      "Septona je jedan od prvih brendova u jugoistočnoj Europi koji je prešao na biorazgradive maramice!",
      "Cijela linija Septona ambalaže izrađena je od reciklirane plastike, a dio je i kompostabilan!",
      "U nekim hotelima u Grčkoj koriste se Septona proizvodi kao službeni brend higijene.",
      "Septona brend je aktivan u humanitarnim projektima – donira proizvode bolnicama, školama i izbjegličkim centrima. 💙",
      "Septona ima i liniju za sportaše, sa specijalnim maramicama i gelovima za dezinfekciju ruku.",
      "Septona maramice prošle su test sterilnosti ISO 22716 – standard koji koriste farmaceutske kompanije!",
      'Septona slogan "Feel the purity" nije samo reklama – to je filozofija brenda od prvog dana!',
      "Iako je Septona globalni brend, i dalje proizvodi sve u Grčkoj — ništa se ne seli u Kinu ili Tursku!",
    ],
  };

  const getRandomFact = (brandName: string): string => {
    const facts = brandFacts[brandName] || [];
    if (facts.length === 0) return "";
    return facts[Math.floor(Math.random() * facts.length)];
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedBrand(null);

    // Generiraj nasumičnu rotaciju (minimalno 3 puna okretaja + nasumični kut)
    const minSpins = 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + minSpins * 360 + randomAngle;

    setRotation(totalRotation);

    // Nakon završetka animacije, odredi pobjednika
    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const winnerIndex = Math.floor(normalizedAngle / anglePerItem);
      const winner = brands[winnerIndex];
      setSelectedBrand(winner);
      setRandomFact(getRandomFact(winner.name));
      setIsSpinning(false);
    }, 6000); // Animacija traje 6 sekundi
  };

  // Generiraj boje za svaki segment
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wheelContainer}>
        <div
          ref={wheelRef}
          className={styles.wheel}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 6s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
            background: `conic-gradient(${brands
              .map(
                (_, index) =>
                  `${colors[index % colors.length]} ${
                    index * anglePerItem
                  }deg ${(index + 1) * anglePerItem}deg`
              )
              .join(", ")})`,
          }}
        >
          {brands.map((brand, index) => {
            const itemAngle = index * anglePerItem;
            // Sredina segmenta - smjer prema vanjskom rubu
            const segmentCenterAngle = itemAngle + anglePerItem / 2;

            return (
              <div
                key={brand.id}
                className={styles.wheelItem}
                style={{
                  transform: `rotate(${itemAngle}deg)`,
                }}
              >
                <div
                  className={styles.logoContainer}
                  style={{
                    // Kompenziraj rotaciju segmenta i okreni logo prema sredini segmenta (vanjski rub)
                    // -itemAngle kompenzira rotaciju segmenta, +segmentCenterAngle okreće prema sredini segmenta
                    transform: `rotate(${-itemAngle + segmentCenterAngle}deg)`,
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={320}
                    height={320}
                    className={styles.logo}
                    unoptimized
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.pointer}></div>
        {selectedBrand && (
          <div className={styles.result}>
            <h2>Osvojili ste poklon iz asortimana</h2>
            <div className={styles.winner}>
              <Image
                src={selectedBrand.logo}
                alt={selectedBrand.name}
                width={480}
                height={480}
                className={styles.winnerLogo}
                unoptimized
              />
              <h3 className={styles.didYouKnow}>Jeste li znali?</h3>
              {randomFact && (
                <div className={styles.factContainer}>
                  <p className={styles.factText}>{randomFact}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isSpinning && (
        <button onClick={spin} className={styles.spinButton}>
          Pokreni kolo sreće!
        </button>
      )}
    </div>
  );
}
