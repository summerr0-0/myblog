"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";

export default function ConditionalHeader() {
    const pathname = usePathname();

    // 메인 페이지를 제외한 경우만 Header 렌더링
    return pathname !== "/" ? <Header /> : null;
}
