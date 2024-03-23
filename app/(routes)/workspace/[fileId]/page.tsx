'use client'
import React, { useEffect, useState } from 'react'
import WorkSpaceHeader from './_components/WorkSpaceHeader'
import Editor from './_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from './_components/Canvas';

function Workspace({params}:any) {
    const [triggerSave, setTriggerSave] = useState(false);
    const convex=useConvex();
    const [fileData,setFileData]=useState<FILE|any>()
    useEffect(()=>{
        // console.log("fileID",params.fileId)//gives fileID
        params.fileId&&getFileData();
    },[])

    const getFileData=async()=>{
        const result=await convex.query(api.files.getFileById,{_id:params.fileId})
        // console.log(result);
        setFileData(result);
    }
    return (
        <div>
            <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
            {/* workspace layout */}
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Document */}
                <div className='h-screen'>
                    <Editor onSaveTrigger={triggerSave}
                    fileId={params.fileId}
                    fileData={fileData}/>
                </div>

                {/* whiteboard */}
                <div className='h-screen border-l'>
                    <Canvas onSaveTrigger={triggerSave}
                    fileId={params.fileId}
                    fileData={fileData} />
                </div>


            </div>

        </div>
    )
}

export default Workspace