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
  const wheelRef = useRef<HTMLDivElement>(null);

  const anglePerItem = 360 / brands.length;

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
            <h2>Osvojili ste:</h2>
            <div className={styles.winner}>
              <Image
                src={selectedBrand.logo}
                alt={selectedBrand.name}
                width={480}
                height={480}
                className={styles.winnerLogo}
                unoptimized
              />
              <p className={styles.winnerName}>{selectedBrand.name}</p>
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
