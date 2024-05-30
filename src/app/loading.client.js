"use client";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect, useRef } from "react";

export default function NavigationEvents() {
  const pathname = usePathname(); 
  const searchParams = useSearchParams()

  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (savedPathNameRef.current !== pathname) {
      // Update REF
      savedPathNameRef.current = pathname;
      nProgress.done(false)
    }
  }, [pathname,searchParams]);
};

export const npstart=()=>{
  setTimeout(()=>{
    nProgress.done(false);
  },12000)
  nProgress.configure({
    template: `
    <div class="bar" role="bar">
        <div class="peg"></div>
    </div>
    <div class="spinner d-flex align-items-center justify-content-center" style="height: 100vh; width: 100vw;" role="spinner">
        <div class="spinner-border text-colorPrimary m-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `,
  });
  
  nProgress.start()
}