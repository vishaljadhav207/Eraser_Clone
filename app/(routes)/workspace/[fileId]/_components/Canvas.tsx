import { FILE } from "@/app/(routes)/dashboard/_components/FileList";
import { api } from "@/convex/_generated/api";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";

import React, { use, useEffect, useState } from "react";

function Canvas({
    onSaveTrigger,
    fileId,
    fileData,
}: {
    onSaveTrigger: any;
    fileId: any;
    fileData: FILE;
}) {

    const [whiteBoardData,setWhiteBoardData]=useState<any>();
    const updateWhiteboard=useMutation(api.files.updateWhiteboard)


    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger])
    const saveWhiteboard = () => {
        updateWhiteboard({
            _id:fileId,
            whiteboard:JSON.stringify(whiteBoardData)
        }).then(resp=>console.log(resp))
    };
    return (
        <div style={{ height: "700px" }}>
            {fileData&&<Excalidraw
            initialData={{
                elements:fileData?.whiteboard&&JSON.parse(fileData?.whiteboard)
            }}
                onChange={(excalidrawElements, appState, files) =>
                    // console.log(excalidrawElements)
                    setWhiteBoardData(excalidrawElements)
                }
                UIOptions={{
                    canvasActions: {
                        saveToActiveFile: false,
                        loadScene: false,
                    },
                }}
            >
                <WelcomeScreen>
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Hints.MenuHint />
                </WelcomeScreen>
            </Excalidraw>}
        </div>
    );
}

export default Canvas;
