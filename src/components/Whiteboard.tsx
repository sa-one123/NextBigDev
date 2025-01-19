'use client'

import { useEffect, useRef, useState } from "react"
import ReactCanvasDraw from 'react-canvas-draw'
import io,{ Socket } from 'socket.io-client'

const socket : Socket = io();
// interface WhiteboardProps {}

const Whiteboard: React.FC= () =>{
    const canvasRef = useRef<ReactCanvasDraw | null>(null);
    const [brushColor, setBrushColor] = useState<string>("#000");
    const [brushRadius, setBrushRadius] = useState<number>(3)
    useEffect(() => {
        const handleSocketDraw = (data: string) => {
          const canvas = canvasRef.current;
          if (canvas) canvas.loadSaveData(data);
        };
    
        socket.on("draw", handleSocketDraw);
        return () => {
          socket.off("draw", handleSocketDraw);
        };
    }, []);
    
    const handleDraw = ()=>{
        const canvas = canvasRef.current;
        if(canvas) socket.emit("draw", canvas.getSaveData())
    }
    
    return (
        <div className="p-4">
            <div className="mb-4 flex items-center gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Brush Color:</label>
                    <input 
                        type="color" 
                        value={brushColor} 
                        onChange={(e)=> setBrushColor(e.target.value)}
                        className="border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Brush Size:</label>
                    <input 
                        type="number" 
                        value={brushRadius}
                        onChange={(e)=> setBrushRadius(Number(e.target.value))}
                        min={1}
                        max={20}
                        className="border rounded-md w-16 text-center"
                    />  
                </div>
            </div>
            <ReactCanvasDraw 
                ref={canvasRef}
                brushColor={brushColor}
                brushRadius={brushRadius}
                lazyRadius={0}
                canvasWidth={800}
                canvasHeight={600}
                onChange={handleDraw}
                className="border border-gray-300 rounded-md"
            />
        </div>
    );
}

export default Whiteboard;