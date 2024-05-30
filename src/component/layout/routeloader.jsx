"use client"
import { npstart } from "@/app/loading.client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const NextLinkCB=({children,href,CB=null,className, ...r})=>{
    return(
      <Link className={`text-reset text-decoration-none ${className}`} href={href} {...r} onClick={()=>{
        npstart()
        if(CB) CB()
      }}>{children}</Link>
    )
  }
  export const useNextPush=()=>{
      const router = useRouter()
      const NextPush=(href)=>{
          router.push(href);
          npstart()
      }
    return {NextPush}
  }