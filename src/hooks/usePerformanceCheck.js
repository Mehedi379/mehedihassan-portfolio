import { useEffect, useState } from 'react';

export default function usePerformanceCheck() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Check if device is mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // Check hardware concurrency (CPU cores)
      const cpuCores = navigator.hardwareConcurrency || 4;

      // Check device memory (RAM in GB)
      const deviceMemory = navigator.deviceMemory || 4;

      // Determine if low performance
      const lowPerf = isMobile && (cpuCores <= 4 || deviceMemory <= 4);

      setIsLowPerformance(lowPerf);

      // Store in localStorage for future reference
      localStorage.setItem('lowPerformance', JSON.stringify(lowPerf));
    };

    checkPerformance();
  }, []);

  return isLowPerformance;
}
