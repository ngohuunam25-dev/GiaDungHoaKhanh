"use client";
import { useEffect, useRef, useState } from "react";

const useElementOnScreen = (options?: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunc = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(entry.isIntersecting);
      } else {
        setIsVisible(entry.isIntersecting);
      }
    });
  };
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(callbackFunc, options);
    observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);
  return [containerRef, isVisible];
};
export default useElementOnScreen;
