"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";

export const SparklesCore = (props: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}) => {
  const { id, className, background, minSize, maxSize, particleDensity, particleColor } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <motion.div animate={{ opacity: init ? 1 : 0 }} className={className}>
      {init && (
        <Particles
          id={id || useId()}
          className="h-full w-full"
          options={{
            background: { color: { value: background || "transparent" } },
            fullScreen: { enable: false },
            particles: {
              color: { value: particleColor || "#ffffff" },
              number: { value: particleDensity || 100 },
              size: { value: { min: minSize || 1, max: maxSize || 3 } },
              opacity: { value: { min: 0.1, max: 1 } },
              move: { enable: true, speed: 0.5, direction: "none" },
            },
          }}
        />
      )}
    </motion.div>
  );
};