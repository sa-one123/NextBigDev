'use client'

import Whiteboard from "@/components/Whiteboard";
import { useParams } from "next/navigation";

// interface BoardPageProps {
//     params : {
//         id: string;
//     }
// }

export default function BoardPage(){
    const params = useParams();
    return (
        <>
            <h1>Whiteboard ID: {params?.id}</h1>
            <Whiteboard />
        </>
    )
};