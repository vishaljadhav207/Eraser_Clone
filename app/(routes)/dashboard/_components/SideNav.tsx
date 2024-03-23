import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const convex = useConvex();
  const [totalFile, setTotalFiles] = useState<Number>();
  const {fileList_,setFileList_}=useContext(FileListContext)

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    createFile({
      fileName: fileName,
       //@ts-ignore
      teamId: activeTeam?._id,
       //@ts-ignore
      createdBy: user?.email,
      archive: false,
      document: "", 
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error while creating file");
      }
    );
  };


  
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      //@ts-ignore
      teamId: activeTeam?._id,
    });
    console.log(result);
    setFileList_(result)
    setTotalFiles(result?.length);
    
  };

  return (
    <div className=" h-screen fixed w-72 border-[1px] border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFile={totalFile}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav;
